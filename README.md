# Figma to Pdf v2

# What you can Expect

- Low Size pdf
- 1.5 pdf that will work properly on OSX
- Customize output (outline text, choose only specific frames, etc ...)
- Oauth support
- Better client

# What tools

```Inkscape CLI``` to convert svg to pdf instead of pdfkit. Faster and provide 1.5 pdf version
```PDFTK CLI``` to merge the different pages into one pdf

# Examples
```
inkscape page.svg --export-pdf-version=1.5 --export-pdf=page.pdf
pdftk *.pdf cat output complete.pdf
```
