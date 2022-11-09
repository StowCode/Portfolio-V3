////////////////////////////////
// Project Tiles

/* const proj1 = document.getElementById('proj1_sub')
const proj1_description = document.querySelector('.proj_description')

proj1.addEventListener('mouseover', function addText() {
    proj1_description.classList.add('fadein')
    console.log('its working')
})

proj1.onmouseout = function() {
    proj1_description.classList.remove('fadein');
}  */


const tile = document.getElementsByClassName('tile_sub_container');

for( var i=0; i<tile.length; i++){
    tile[i].addEventListener("mouseenter", function() { 
        this.classList.add()

        const target = this.parentNode.firstChild.nextSibling.nextSibling.nextSibling
        target.classList.add('block')
    })
}

for( var i=0; i<tile.length; i++){
    tile[i].addEventListener("mouseout", function() { 
        const target = this.parentNode.firstChild.nextSibling.nextSibling.nextSibling
        target.classList.remove('block')
    } );
}