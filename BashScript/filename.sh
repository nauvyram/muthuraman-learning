#!/bin/bash
echo "Enter Filename"
read filename

if [ -e $filename ]
	then 
	echo "$filename exists"

	cat $filename

else 
	cat > $filename
	echo "file created"

fi
