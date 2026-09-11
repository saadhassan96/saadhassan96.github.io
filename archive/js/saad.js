$(document).ready(function() {
    $('.container a').attr('target', '_blank');
    $('.mail-link').attr('target', '_self');
    $('.equal-contribution').shuffleOrder();
    initializeAnalyticsDownloadTracker();
});

$.fn.shuffleOrder = function() {
    $.each(this.get(), function(index, el) {
        var $el = $(el);
        var $find = $el.children();

        $find.sort(function() {
            return 0.5 - Math.random();
        });

        $el.empty();
        $find.appendTo($el);
    });
};

function initializeAnalyticsDownloadTracker() {
    if (typeof jQuery != 'undefined') {
        var filetypes = /\.(zip|exe|dmg|pdf|doc.*|xls.*|ppt.*|mp3|txt|rar|wma|mov|avi|wmv|flv|wav)$/i;
        var baseHref = '';
        if (jQuery('base').attr('href') != undefined) baseHref = jQuery('base').attr('href');
        var hrefRedirect = '';
     
        jQuery('body').on('click', 'a', function(event) {
            var el = jQuery(this);
            var track = true;
            var href = (typeof(el.attr('href')) != 'undefined' ) ? el.attr('href') : '';
            var isThisDomain = href.match(document.domain.split('.').reverse()[1] + '.' + document.domain.split('.').reverse()[0]);
            if (!href.match(/^javascript:/i)) {
                var elEv = []; elEv.value=0, elEv.non_i=false;
                if (href.match(/^mailto\:/i)) {
                    elEv.category = 'email';
                    elEv.action = 'click';
                    elEv.label = href.replace(/^mailto\:/i, '');
                    elEv.loc = href;
                }
                else if (href.match(filetypes)) {
                    var extension = (/[.]/.exec(href)) ? /[^.]+$/.exec(href) : undefined;
                    elEv.category = 'download';
                    elEv.action = 'click-' + extension[0];
                    elEv.label = href.replace(/ /g,'-');
                    elEv.loc = baseHref + href;
                }
                else if (href.match(/^https?\:/i) && !isThisDomain) {
                    elEv.category = 'external';
                    elEv.action = 'click';
                    elEv.label = href.replace(/^https?\:\/\//i, '');
                    elEv.non_i = true;
                    elEv.loc = href;
                }
                else if (href.match(/^tel\:/i)) {
                    elEv.category = 'telephone';
                    elEv.action = 'click';
                    elEv.label = href.replace(/^tel\:/i, '');
                    elEv.loc = href;
                }
                else track = false;
     
                if (track) {
                    var ret = true;
     
                    if((elEv.category == 'external' || elEv.category == 'download') && (el.attr('target') == undefined || el.attr('target').toLowerCase() != '_blank') ) {
                        hrefRedirect = elEv.loc;
     
                        ga('send','event', elEv.category.toLowerCase(),elEv.action.toLowerCase(),elEv.label.toLowerCase(),elEv.value,{
                            'nonInteraction': elEv.non_i ,
                            'hitCallback':gaHitCallbackHandler
                        });
     
                        ret = false;
                    }
                    else {
                        ga('send','event', elEv.category.toLowerCase(),elEv.action.toLowerCase(),elEv.label.toLowerCase(),elEv.value,{
                            'nonInteraction': elEv.non_i
                        });
                    }
     
                    return ret;
                }
            }
        });
     
        gaHitCallbackHandler = function() {
            window.location.href = hrefRedirect;
        }
    }
}

// --- Paper filter bar with counts ---
// jQuery required, put this after jQuery is loaded

$(function() {
  var selectedFilters = [];

  // Count tags at page load
  updateFilterCounts();

  $('.paper-filter-bar .filter-btn').click(function() {
    var filter = $(this).data('filter');

    if (filter === "all") {
      // "All" resets filters
      selectedFilters = [];
      $('.paper-filter-bar .filter-btn').removeClass('active');
      $(this).addClass('active');
      $('.paper-row').show();
    } else {
      // Toggle this filter
      var i = selectedFilters.indexOf(filter);
      if (i > -1) {
        selectedFilters.splice(i, 1);
        $(this).removeClass('active');
      } else {
        selectedFilters.push(filter);
        $(this).addClass('active');
      }
      $('.paper-filter-bar .filter-btn[data-filter="all"]').removeClass('active');

      // If none selected, treat as "All"
      if (selectedFilters.length === 0) {
        $('.paper-filter-bar .filter-btn[data-filter="all"]').addClass('active');
        $('.paper-row').show();
      } else {
        // Show only matching
        $('.paper-row').each(function() {
          var tags = ($(this).attr('data-tags') || "")
            .split(',')
            .map(function(tag) { return tag.trim(); })
            .filter(Boolean);
          // Match if ANY selected filter is in tags
          var match = selectedFilters.some(function(sel) { return tags.includes(sel); });
          $(this).toggle(match);
        });
      }
    }

    // Optionally, you can update counts after filtering, but typically counts stay total.
    // Uncomment below if you want live counts to show *only* visible papers.
    // updateFilterCounts(selectedFilters);
  });

  // Ensure counts show on first load
  updateFilterCounts();
});

function updateFilterCounts() {
  var tagCounts = {};
  // Count per tag (split by comma and trim, support multiple tags per paper)
  $('.paper-row').each(function() {
    var tags = ($(this).attr('data-tags') || '')
      .split(',')
      .map(function(tag) { return tag.trim(); })
      .filter(Boolean);
    // Count for each tag this paper has
    tags.forEach(function(tag) {
      if (!tag) return;
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  // "All" is total count of papers
  tagCounts['all'] = $('.paper-row').length;

  // Set counts
  $('.paper-filter-bar .filter-btn').each(function() {
    var tag = $(this).data('tag');
    var count = tagCounts[tag] || 0;
    $(this).find('.filter-count').text('(' + count + ')');
  });
}
