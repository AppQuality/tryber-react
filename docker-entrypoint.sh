#!/bin/sh

CONFIG_FILE_PATH="/build/static/env-config.js"
# Recreate config file
rm -rf $CONFIG_FILE_PATH
touch $CONFIG_FILE_PATH

# Add assignment
echo "window._env_ = {" >> $CONFIG_FILE_PATH

VARIABLES=$(printenv | grep REACT_APP)


# Read each line in .env file
# Each line represents key=value pairs
while read -r line || [ -n "$line" ];
do
    # Split env variables by character `=`
    if printf '%s\n' "$line" | grep -q -e '='; then
        varname=$(printf '%s\n' "$line" | sed -e 's/=.*//')
        varvalue=$(printf '%s\n' "$line" | sed -e 's/^[^=]*=//')
    fi
    # Read value of current variable if exists as Environment variable
    value=$(printf '%s\n' "${!varname}")
    # Otherwise use value from .env file
    if [ -z $value ]; then
        value=${varvalue}
    fi

    # Append configuration property to JS file
    echo "  $varname: \"$value\"," >> $CONFIG_FILE_PATH
done << EOF
$VARIABLES
EOF

echo "}" >> $CONFIG_FILE_PATH

nginx -g 'daemon off;'