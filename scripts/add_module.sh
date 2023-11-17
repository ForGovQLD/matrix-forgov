#!/bin/sh

#######
# Set varialbes
#######
version="0.1.0";
templatesPath="src/templates";
modulesPathRelative="../../src/modules";
modulesPathAbsolute="./src/modules";

#######
# Set colors
#######
RED='\033[0;31m';
LRED='\033[1;31m';
GREEN='\033[0;32m';
LGREEN='\033[1;32m';
NC='\033[0m'; # No Color

#######
# Functions
#######

# Cross env sed in place - https://stackoverflow.com/questions/2320564/i-need-my-sed-i-command-for-in-place-editing-to-work-with-both-gnu-sed-and-bsd
sedi () {
  sed --version >/dev/null 2>&1 && sed -i -- "$@" || sed -i "" "$@"
}

# Rename {{module_name}} to real name
rename_module_name() 
{
    path=$1
    moduleNameTrimed=$2
    
    echo "┌──────";
    for lvl1 in $path/*
    do

        # File on first level
        if [ -f "$lvl1" ]; then
            echo -e "| Processing: ${GREEN}[modules]${LGREEN}${lvl1//$modulesPathRelative/}${NC}";
            sedi "s/{{module_name}}/$moduleNameTrimed/g" $lvl1
        fi
        
        # Folder on first level
        if [ -d "$lvl1" ]; then
            for lvl2 in $lvl1/*
            do
                # File on second level
                if [ -f "$lvl2" ];
                then
                    echo -e "| Processing: ${GREEN}[modules]${LGREEN}${lvl2//$modulesPathRelative/}${NC}";
                    sedi "s/{{module_name}}/$moduleNameTrimed/g" $lvl2
                fi
            done
        fi
    done
    echo "└──────";
}


#######
# Get new module name
#######
echo "┌──────";
echo -e "| Add module version: ${LGREEN}$version${NC}";
echo "├──────";

echo -n "└ Input module name: ";
read moduleName;
moduleNameTrimed=${moduleName//[[:space:]]/_}

if [ -d "$modulesPathAbsolute/$moduleNameTrimed" ]; then
    echo -e "[${RED}Error${NC}] Module with that name already exists."
    exit;
fi

#######
# Get template list
#######
cd $templatesPath;
PS3="Select module template: ";
select entry in *
do

    # Do not remove this - will casue issues when you type a number not on the list
    if [ ! -d "$entry" ]; then
        echo -e "[${RED}Error${NC}] Wrong template number."
        exit;
    fi

    # Copy
    mkdir "$modulesPathRelative/$moduleNameTrimed"
    cp -R "$entry/." "$modulesPathRelative/$moduleNameTrimed";

    rename_module_name $modulesPathRelative/$moduleNameTrimed $moduleNameTrimed
    
    echo "┌──────";
    echo -e "| You picked ${LGREEN}$entry${NC}";
    echo -e "| To access new module folder type ${LGREEN}cd '$modulesPathAbsolute/$moduleNameTrimed'${NC}";
    echo "└──────";
    
    exit;
done

