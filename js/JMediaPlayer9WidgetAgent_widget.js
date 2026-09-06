var music_list=[
    {
        src: "./media/music/Infrunami.m4a",
        synced_lyrics:"",
        title: "Infrunami",
        album: "Infrunami",
        artist: "Unknown Artist",
        date: ""
    },
    {
        src: "./media/music/You.m4a",
        synced_lyrics:"",
        title: "You",
        album: "Lessons in Love",
        artist: "Lloyd feat. Lil Wayne",
        date: "2007"
    },
    {
        src: "./media/music/Pretty Ho3.m4a",
        synced_lyrics:"",
        title: "Pretty Ho3",
        album: "Pretty Ho3",
        artist: "Unknown Artist",
        date: ""
    },
    {
        src: "./media/music/Belong to the City.m4a",
        synced_lyrics:"",
        title: "Belong to the City",
        album: "PARTYNEXTDOOR TWO",
        artist: "PARTYNEXTDOOR",
        date: "2014"
    },
    {
        src: "./media/music/Congratulations.m4a",
        synced_lyrics:"",
        title: "Congratulations",
        album: "GO:OD AM",
        artist: "Mac Miller feat. Bilal",
        date: "2015"
    },
    {
        src: "./media/music/White Tee.m4a",
        synced_lyrics:"",
        title: "White Tee",
        album: "White Tee",
        artist: "Summer Walker with Noi-Noah",
        date: "2024"
    },
    {
        src: "./media/music/TBH.m4a",
        synced_lyrics:"",
        title: "TBH",
        album: "PARTYNEXTDOOR",
        artist: "PARTYNEXTDOOR",
        date: ""
    }
]

class JMediaPlayer9WidgetAgent {
    constructor(id) {
        this.playlist=music_list;
        this.player_id = id;
        this.audio_elem=document.querySelector(`#${this.player_id}_controller`);
        this.selected_index=null;
        this.progress_controller=null;
        document.querySelector(`#${this.player_id} .seekbar-mid`).addEventListener('click', (event) => {
            var bbl = document.querySelector(`#${this.player_id} .seekbar-mid`).getBoundingClientRect().left;
            var lth = document.querySelector(`#${this.player_id} .seekbar-mid`).getBoundingClientRect().width;
            var prc = Math.round(((event.x - bbl)/lth)*10000)/100;
            this.setseekbaratperc(prc);

            this.audio_elem.currentTime=this.audio_elem.duration * (prc/100);
        })

        document.querySelector(`#${this.player_id} .seekbar-mid`).addEventListener('touchstart', (event) => {
            var bbl = document.querySelector(`#${this.player_id} .seekbar-mid`).getBoundingClientRect().left;
            var lth = document.querySelector(`#${this.player_id} .seekbar-mid`).getBoundingClientRect().width;
            var prc = Math.round(((event.touches[0].clientX - bbl)/lth)*10000)/100;
            this.setseekbaratperc(prc);

            this.audio_elem.currentTime=this.audio_elem.duration * (prc/100);
        })

        document.querySelector(`#${this.player_id} .button-play`).addEventListener('click', () => {
            this.playpause();
        })

        document.querySelector(`#${this.player_id} .button-prev`).addEventListener('click', () => {
            this.prev();
        })

        document.querySelector(`#${this.player_id} .button-next`).addEventListener('click', () => {
            this.next();
        })

        document.querySelector(`#${this.player_id} .button-volume`).addEventListener('click', () => {
            this.togglemute();
        })

        document.querySelector(`#${this.player_id} .button-stop`).addEventListener('click', () => {
            this.stop();
        })

        this.audio_elem.addEventListener('ended', () => {
            this.resetseekbar();
            document.querySelector(`#${this.player_id}`).dataset.playstate="paused";
            this.playatindex((parseInt(this.selected_index)+1) % this.playlist.length);
        })

        
        var cnt=0;
        this.playlist.forEach(song => {
            var new_node=document.querySelector(`#${this.player_id} .playlist-list .list-item`).cloneNode(true);
            new_node.classList.remove("template");
            new_node.querySelector(`span`).innerHTML=`${song.title} - ${song.artist}`;
            new_node.dataset.index=cnt;
            cnt++;
            new_node.addEventListener('click', () => {
                this.playatindex(new_node.dataset.index)
            })
            document.querySelector(`#${this.player_id} .playlist-list`).appendChild(new_node);
        })
    }

    set_progresscontroller = () => {
        if(this.progress_controller==null)
        this.progress_controller = setInterval(() => {
            console.log("control")
            var percentage=Math.round((jmp9a.audio_elem.currentTime/jmp9a.audio_elem.duration)*10000)/100;
            this.setseekbaratperc(percentage);
        },350);
    }

    resetseekbar = () => {
        document.querySelector(`#${this.player_id} .progress`).style.width=`0%`;
        document.querySelector(`#${this.player_id} .button-trackslider`).style.left=`0%`;
    }

    setseekbaratperc = (perc) => {
        document.querySelector(`#${this.player_id} .progress`).style.width=`${perc}%`;
        document.querySelector(`#${this.player_id} .button-trackslider`).style.left=`${perc}%`;
    }

    pause_progresscontroller = () => {
        clearInterval(this.progress_controller);
        this.progress_controller=null;
    }

    playpause = () => {
        if(document.querySelector(`#${this.player_id}`).dataset.playstate=="paused") this.play();
        else if(document.querySelector(`#${this.player_id}`).dataset.playstate=="playing") this.pause();
    }

    togglemute = () => {
        this.audio_elem.muted=!this.audio_elem.muted;
        var img=document.querySelector(`#${this.player_id} .button-volume img`);
        img.src=this.audio_elem.muted ? "./img/widgets/mediaplayer/button_volume_disabled.png" : "./img/widgets/mediaplayer/button_volume.png";
    }

    play = () => {
        if(this.selected_index==null) {this.playatindex(0); return;}
        this.audio_elem.play();
        document.querySelector(`#${this.player_id} .button-stop`).disabled=false;
        document.querySelector(`#${this.player_id}`).dataset.playstate="playing";
        this.set_progresscontroller();

        document.querySelector(`#${this.player_id} .text span.title`).innerHTML=this.playlist[this.selected_index].title;
        document.querySelector(`#${this.player_id} .text span.album`).innerHTML=this.playlist[this.selected_index].album;
        document.querySelector(`#${this.player_id} .text span.artist`).innerHTML=this.playlist[this.selected_index].artist;
        document.querySelector(`#${this.player_id} .text span.date`).innerHTML=this.playlist[this.selected_index].date;

        document.querySelector(`#${this.player_id}`).dataset.title=this.playlist[this.selected_index].title;
        document.querySelector(`#${this.player_id}`).dataset.album=this.playlist[this.selected_index].album;
        document.querySelector(`#${this.player_id}`).dataset.artist=this.playlist[this.selected_index].artist;

        var base=this.playlist[this.selected_index].src.replace(/\.[^/.]+$/, '');
        document.querySelector(`#${this.player_id} .song-info img.cover`).src=base+"_cover.jpg";
        document.querySelector(`#${this.player_id} .song-info img.disc`).src=base+"_disc.png";
        document.querySelector(':root').style.setProperty('--music-player-bk', "url(\""+base+"_background.webp\")");
    }

    playatindex = (index) => {
        this.selected_index=parseInt(index);
        this.audio_elem.src=this.playlist[this.selected_index].src;
        this.play();
        document.querySelectorAll(`#${this.player_id} .playlist-list .list-item`).forEach(item => item.classList.remove("selected"));
        document.querySelectorAll(`#${this.player_id} .playlist-list .list-item:not(.template)`)[this.selected_index].classList.add("selected");
    }

    pause = () => {
        this.audio_elem.pause();
        document.querySelector(`#${this.player_id}`).dataset.playstate="paused"
        this.pause_progresscontroller();
    }

    next = () => {
        this.playatindex((parseInt(this.selected_index)+1) % this.playlist.length);
    }

    prev = () => {
        this.playatindex((parseInt(this.selected_index)-1+this.playlist.length) % this.playlist.length);
    }

    stop = () => {
        this.pause_progresscontroller();
        this.resetseekbar();
        this.audio_elem.pause();
        this.audio_elem.currentTime=0;
        document.querySelector(`#${this.player_id}`).dataset.playstate="paused";
        document.querySelector(`#${this.player_id} .button-stop`).disabled=true;
        document.querySelector(`#${this.player_id} .song-info img.cover`).src="./img/widgets/mediaplayer/genericcover.jpg";
        document.querySelector(`#${this.player_id} .song-info img.disc`).src="./img/widgets/mediaplayer/genericdisc.png"
        document.querySelector(':root').style.setProperty('--music-player-bk', "url(\"./img/widgets/mediaplayer/backgrounddefault.jpg\")");

        document.querySelector(`#${this.player_id} .text span.title`).innerHTML="Title";
        document.querySelector(`#${this.player_id} .text span.album`).innerHTML="Album";
        document.querySelector(`#${this.player_id} .text span.artist`).innerHTML="Artist";
        document.querySelector(`#${this.player_id} .text span.date`).innerHTML="Date";

        document.querySelector(`#${this.player_id}`).dataset.title="";
        document.querySelector(`#${this.player_id}`).dataset.album="";
        document.querySelector(`#${this.player_id}`).dataset.artist="";
    }
}
