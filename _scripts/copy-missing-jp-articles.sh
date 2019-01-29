# Move to _articles relative to this script
COLLECTION="_articles"
SRC='en'
DST='jp'

cd "${0%/*}/../$COLLECTION"
echo "Copying missing files from $SRC/ to $DST/ recursively.."

files=`rsync --recursive --update --checksum --out-format=%n --ignore-existing --include '*/' --include '*.md' --exclude '*' $SRC/ $DST/`

for f in $files; do
  fpath="$DST/$f"
  if [ ! -f "$fpath" ]; then continue; fi
  
  TITLE_MISSING='# jp title missing'
  INCLUDE='{% include not_translated_yet.html %}'
  fm=`awk -v tm="$TITLE_MISSING" -v i="$INCLUDE" '/^\---$/{if(flag == 0) { printf "---\n%s\n",tm; flag++; next; } if(flag == 1) { printf "---\n\n%s\n\n",i; flag++; next; }  }flag' < $fpath`

  if [ ! -z "$fm" ]; then
    echo -e "$fm" > "$fpath"
  fi

  echo "Copied: $fpath"
done

echo "Done!"
