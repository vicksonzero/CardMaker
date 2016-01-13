# Card Maker

Generates **print-to-play** card sheet from `svg` templates and `csv` data sheets. useful for prototyping and crude production

# 1. How to use

## 1.1. Prepare input data

### Template

Create a **Scalable Vector Graphics**(`svg`) file with replacable content marked `#keywordHere`

Example file:

    <?xml version="1.0" encoding="utf-8"?>
    <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    	 width="149.054688px" height="209.837891px" viewBox="-0.000244 0 149.054688 209.837891"
    	 enable-background="new -0.000244 0 149.054688 209.837891" xml:space="preserve">


    	<rect x="12.499756" y="14.833008" fill="#FFFFFF" stroke="#000000" stroke-miterlimit="10" width="128" height="186.5"/>
    <circle fill="#FFFFFF" stroke="#000000" stroke-miterlimit="10" cx="22.999756" cy="23.833008" r="16.5"/>
    <text transform="matrix(1 0 0 1 22.999756 26.333008)" text-anchor="middle" font-size="12">#cost</text>
    <text transform="matrix(1 0 0 1 22.000244 103.333008)" font-size="20">#name</text>
    <text transform="matrix(1 0 0 1 22.000244 114.333008)" font-size="9">#description</text>
    </svg>

NOTE:

1. text labels to be replaced are `#cost`, `#name` and `#description`
2. some svg files may not support text alignment to center or right. you may add `text-anchor="middle"` manually to fix it

### Card list

Create a **Comma separated value**(`csv`) file with the first rows valued `#whatever`

You can use major spreadsheet applications like excel to fill in the data and then save as `.csv`

Example file:

    #cost,#name,#description
    10,aadad,ajdiljjd
    20,basdasd,sadhjl dwjd
    30,casdsd,ajdiljjdjvjeif
    40,dfad,adjlw
    50,eafad,jvjeif
    60,fawdad,pqjjfjef
    70,gadasd,cjudae
    80,hasdad,oiiksa
    90,iada,lciwjald
    100,jsadsad,cjsawj
    110,kasda,wiuasld
    120,lasdsad,"content, with, comma"
    130,masadsa,"content ""with"" quotes"

## 1.2. Put them together

1. Open `index.html`
2. Fill in `Title`, `Version`, `Author`, `row`, `column`
3. Choose `Template file` and `Data file`
4. Press `Generate`
5. Adjust `row` and `column` if some cards do not appear
6. Press `Print` or `Ctrl+P` to print. You can choose to print to pdf

## 1.3. Finishing

You can print the cards on cardboards. 
If you choosebto print them on A4 paper, you can slide them into other cards with clear sleeves as a support. This way you can prototype the game as quickly as possible

# 2. Build

    $ npm install -g gulp
	$ npm install
	$ gulp

This project uses `browserify`. Write in nodejs style and `js/bundle.js` is created automatically to contain all files


# 3. Features

    [x] load input files from computer
    [x] clean printable version
    [x] localStorage version number and creater details
    [ ] increment version and create
    [x] example data
    [ ] preview data
    [ ] Exact match
    [ ] Attach picture
    [ ] pagination
    [ ] change color
    [ ] don't use gray line use crop mark
    [ ] add version number to every card

# License

MIT
