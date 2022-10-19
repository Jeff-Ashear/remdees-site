## script to copy files ending with .jpg to pexels-n.jpg
let i=0; for file in *.jpg; do mv "$file" "pexels-$i.jpg"; let i=i+1 ; done