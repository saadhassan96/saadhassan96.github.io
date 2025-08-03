---
title: 'Modeling Word Importance in Conversational Transcripts: Toward improved live captioning for Deaf and hard of hearing viewers'

# Authors
# If you created a profile for a user (e.g. the default `admin` user), write the username (folder name) here
# and it will be replaced with their full name and linked to their profile.
authors:
  - amin
  - admin
  - huenerfauth
  - alm

# Author notes (optional)
author_notes:
  # - 'Equal contribution'
  # - 'Equal contribution'

date: '2023-04-30T00:00:00Z'
doi: '10.1145/3587281.3587290'

# Schedule page publish date (NOT publication's date).
publishDate: '2023-04-30T00:00:00Z'

# Publication type.
# Accepts a single type but formatted as a YAML list (for Hugo requirements).
# Enter a publication type from the CSL standard.
publication_types: ['paper-conference']

# Publication name and optional abbreviated publication name.
publication: In Proceedings of the 20th International Web for All Conference (W4A '23)
publication_short: In W4A '23

abstract: Despite the recent improvements in automatic speech recognition (ASR) systems, their accuracy is imperfect in live conversational settings. Classifying the importance of each word in a caption transcription can enable evaluation metrics that best reflect Deaf and Hard of Hearing (DHH) readers’ judgment of the caption quality. Prior work has proposed using word embeddings, e.g., word2vec or BERT embeddings, to model word importance in conversational transcripts. Recent work also disseminated a human-annotated word importance dataset. We conducted a word-token level analysis on this dataset and explored Part-of-Speech (POS) distribution. We then augmented the dataset with POS tags and reduced the class imbalance by generating 5% additional text using masking. Finally, we investigated how various supervised models learn the importance of words. The best performing model trained on our augmented dataset performed better than prior models. Our findings can inform the design of a metric for measuring live caption quality from DHH users’ perspectives.


# Summary. An optional shortened abstract.
summary: W4A 2023

tags: [captioning]

# Display this page in the Featured widget?
featured: true

# Custom links (uncomment lines below)
# links:
# - name: .bibtex
#   url: cite.bib

url_pdf: 'https://dl.acm.org/doi/pdf/10.1145/3587281.3587290'
# url_code: 'https://github.com/HugoBlox/hugo-blox-builder'
# url_dataset: 'https://github.com/HugoBlox/hugo-blox-builder'
# url_poster: ''
# url_project: ''
url_slides: 'https://docs.google.com/presentation/d/1omKtOHKiuz7M3VaR5xetQSULFL1yb17Z/edit?usp=sharing&ouid=108965496603216217412&rtpof=true&sd=true'
# url_source: 'https://github.com/HugoBlox/hugo-blox-builder'
# url_video: 'https://youtube.com'

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder.
image:
  caption: 'Image credit: [**Unsplash**](https://unsplash.com/photos/pLCdAaMFLTE)'
  focal_point: ''
  preview_only: true

# Associated Projects (optional).
#   Associate this publication with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `internal-project` references `content/project/internal-project/index.md`.
#   Otherwise, set `projects: []`.
projects:
  - captioning

# Slides (optional).
#   Associate this publication with Markdown slides.
#   Simply enter your slide deck's filename without extension.
#   E.g. `slides: "example"` references `content/slides/example/index.md`.
#   Otherwise, set `slides: ""`.
# slides: example
---

<!-- {{% callout note %}}
Click the _Cite_ button above to demo the feature to enable visitors to import publication metadata into their reference management software.
{{% /callout %}}

{{% callout note %}}
Create your slides in Markdown - click the _Slides_ button to check out the example.
{{% /callout %}} -->

<!-- Add the publication's **full text** or **supplementary notes** here. You can use rich formatting such as including [code, math, and images](https://docs.hugoblox.com/content/writing-markdown-latex/). -->
