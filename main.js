var jmp9a;

var config={
    name: "Nailu",
    status: ""
}

var photo_albums=[
    {
        name:"Random",
        icon:"./img/icons/pallette.png",
        photos:[
            { src:"./media/photos/random1.jpg", caption:"", date:"2026-09-06" },
            { src:"./media/photos/random2.jpg", caption:"", date:"2026-09-06" },
            { src:"./media/photos/random3.jpg", caption:"", date:"2026-09-06" },
            { src:"./media/photos/random4.jpg", caption:"", date:"2026-09-06" },
            { src:"./media/photos/random5.jpg", caption:"", date:"2026-09-06" },
            { src:"./media/photos/random6.jpg", caption:"", date:"2026-09-06" },
            { src:"./media/photos/random7.jpg", caption:"", date:"2026-09-06" },
            { src:"./media/photos/random8.jpg", caption:"", date:"2026-09-06" },
            { src:"./media/photos/random9.jpg", caption:"", date:"2026-09-06" },
            { src:"./media/photos/random10.jpg", caption:"", date:"2026-09-06" },
            { src:"./media/photos/random11.jpg", caption:"", date:"2026-09-06" }
        ]
    },
    {
        name:"Old photos",
        icon:"./img/icons/backup.png",
        photos:[
            { src:"./media/photos/old1.jpg", caption:"", date:"2026-09-06" },
            { src:"./media/photos/old2.jpg", caption:"", date:"2026-09-06" },
            { src:"./media/photos/old3.jpg", caption:"", date:"2026-09-06" },
            { src:"./media/photos/old4.jpg", caption:"", date:"2026-09-06" },
            { src:"./media/photos/old5.jpg", caption:"", date:"2026-09-06" },
            { src:"./media/photos/old6.jpg", caption:"", date:"2026-09-06" },
            { src:"./media/photos/old7.jpg", caption:"", date:"2026-09-06" },
            { src:"./media/photos/old8.jpg", caption:"", date:"2026-09-06" },
            { src:"./media/photos/old9.jpg", caption:"", date:"2026-09-06" },
            { src:"./media/photos/old10.jpg", caption:"", date:"2026-09-06" },
            { src:"./media/photos/old11.jpg", caption:"", date:"2026-09-06" },
            { src:"./media/photos/old12.jpg", caption:"", date:"2026-09-06" }
        ]
    },
    {
        name:"Game stuff",
        icon:"./img/icons/games.png",
        photos:[
            { src:"./media/photos_other/game1.jpg", caption:"", date:"2026-09-06" },
            { src:"./media/photos_other/game2.jpg", caption:"", date:"2026-09-06" },
            { src:"./media/photos_other/game3.jpg", caption:"", date:"2026-09-06" },
            { src:"./media/photos_other/game4.jpg", caption:"", date:"2026-09-06" },
            { src:"./media/photos_other/game5.jpg", caption:"", date:"2026-09-06" },
            { src:"./media/photos_other/game6.jpg", caption:"", date:"2026-09-06" },
            { src:"./media/photos_other/game7.jpg", caption:"", date:"2026-09-06" }
        ]
    }
]

var notes=[
    {
        title:"NAILUSSSS BIRTHDAYYYY",
        content:"<img width='200' src='./media/photos_other/birthday_cats.jpg'><br><h1>HAPPY BIRTHDAYY NAILOOOEOE IM SO HAPPY WE ARE STILL FRIENDS</h1><p>YOU ARE SO COOL, oww don't me emotional, I hope you live to see 100+ 😭 dumbass</p>",
        thumbnail:"./media/photos_other/birthday_cats.jpg",
        short_description: "HAPPY BIRTHDAYY NAILOOOEOE",
        date:"2026-09-17",
    }
]

function previewNote(ind) {
        document.querySelector(`.overlay-black`).style.display="";
        document.querySelector(`.overlay-black .note-preview`).style.display="";
        document.querySelector(`.overlay-black .note-preview .header span.title`).innerHTML=notes[ind].title;
        document.querySelector(`.overlay-black .note-preview .inner-content h1.title`).innerHTML=notes[ind].title;
        document.querySelector(`.overlay-black .note-preview .inner-content .markdown-content`).innerHTML=notes[ind].content;
        document.querySelector(`.overlay-black .note-preview .inner-content span.date`).innerHTML=notes[ind].date;
    }

function previewImage(image) {
    document.querySelector(`.overlay-black`).style.display="";
    document.querySelector(`.overlay-black .image-preview`).style.display="";
    document.querySelector(`.overlay-black .image-preview .inner-content img.main`).src=image;
}

function showHiddenLinks() {
    const style = document.createElement('style');
    style.innerHTML = `
        .nts-hide {
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
        }
    `;
    document.head.appendChild(style);
    console.log("NTS elements are now visible.");
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector(`span.profilename`).innerHTML=config.name;
    document.querySelector(`span.profilestatus`).innerHTML=config.status;
    document.querySelector(`title`).innerHTML=`${config.name} - MyExpressiveProfile`;

    document.querySelectorAll(`button.tabber`).forEach(button => {
        button.addEventListener('click', function() {
            console.log(this.getAttribute('data-tabname'));
            document.querySelectorAll(`.tab-container`).forEach(tabcont => tabcont.style.display="none");

            document.querySelector(`.tab-container.${this.getAttribute('data-tabname')}`).style.display="";

            document.querySelectorAll(`button.tabber`).forEach(btn => btn.disabled = false);
            this.disabled=true;
        });
    })
    jmp9a=new JMediaPlayer9WidgetAgent("mediaplayerwidget");

    photo_albums.forEach(photo_album => {
        var new_node = document.querySelector(`.profile-photos .photos-album.template`).cloneNode(true);
        new_node.querySelector('.header img.icon').src=photo_album.icon;
        new_node.querySelector('.header span.title').innerHTML=photo_album.name;
        photo_album.photos.forEach(photo => {
            var photo_node=document.querySelector(`.profile-photos .photo.template`).cloneNode(true);
            photo_node.querySelector(`img.photo-main`).src=photo.src;
            photo_node.querySelector(`span.caption`).innerHTML=photo.caption;
            photo_node.classList.remove('template');
            photo_node.addEventListener('click', function() {
                previewImage(photo.src)
            })
            new_node.querySelector(`.album-content`).appendChild(photo_node)
        })
        new_node.classList.remove('template');
        document.querySelector(`.profile-photos .inner-content`).appendChild(new_node);
    })

    document.querySelectorAll(`.profile-photos .photos-album .header`).forEach(item => {
        item.addEventListener('click', function() {
            if(!this.parentElement.classList.contains("open")) this.parentElement.classList.add("open");
            else {this.parentElement.classList.remove("open")}
        })
    })

    var cnt=0;
    notes.forEach(note => {
        var new_node = document.querySelector(`.note-item.template`).cloneNode(true);
        new_node.classList.remove("template");
        new_node.querySelector(`h1.title`).innerHTML=note.title;
        new_node.querySelector(`.date-header span`).innerHTML=note.date;
        new_node.dataset.index=cnt;
        cnt++;

        if(note.thumbnail!="") {
            new_node.querySelector(`img.thumb`).style.display="";
            new_node.querySelector(`img.thumb`).src=note.thumbnail;
        }
        else if(note.short_description!="") {
            new_node.querySelector(`p.short-description`).style.display="";
            new_node.querySelector(`p.short-description`).innerHTML=note.short_description;
        }

        document.querySelector(`.profile-notes .inner-content`).appendChild(new_node);
    });

    document.querySelectorAll(`.note-item`).forEach(item => {
        item.addEventListener('click', function() {
            previewNote(item.dataset.index)
        })
    })
});
