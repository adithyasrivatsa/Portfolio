---
title: "Rick & Morty Autoencoder GAN"
date: "2025-10-14"
description: "Generative deep learning on Rick and Morty-style avatars using an autoencoder architecture."
tags: ["projects", "ai", "deep-learning", "gan", "python"]
---

# Rick & Morty Autoencoder GAN

This project explores generative deep learning on Rick and Morty-style avatars using the *GoRickYourself* dataset. The notebook demonstrates an autoencoder architecture, latent space interpolation, and the generation of new cartoon avatars.

## Highlights
- **Autoencoder Architecture:** Compresses avatars into latent representations.
- **Latent Space Interpolation:** Mixes features from different characters to dynamically generate entirely new ones.
- **Research-Oriented:** Demonstrates core principles in generative modeling and unsupervised representation learning.

## Running the Notebook

This project runs within Kaggle or Google Colab environments:
1. Download the *GoRickYourself* dataset on Kaggle and extract it into a `/data/` directory.
2. Open the `Rick & Morty Autoencoder GAN.ipynb` notebook.
3. Ensure the `data_path` variable points perfectly to your dataset (`/rick-autoencoder/data/Ricks1080/`).
4. Execute cells to traverse the full pipeline:
   - **Preprocessing:** Clean and prepare image arrays.
   - **Training:** Train the autoencoder on the image dataset.
   - **Generation:** Traverse the latent space to artificially imagine new avatars.

[View on GitHub](https://github.com/adithyasrivatsa/Rick-Morty-Autoencoder-GAN)
