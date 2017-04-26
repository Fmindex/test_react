import React, { Component } from 'react';
import Reactdom from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail'
const API_KEY = 'AIzaSyAIrKHcTWzoM0OFAiQx6bZUJH-5xVUNiFM';


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            videos: [],
            selectedVideo: null
        };

        YTSearch({key: API_KEY, term: 'Naruto'}, (videos) => {
            console.log(videos);
            this.setState({
                videos: videos,
                selectedVideo: videos[0]
            });
        });


    }

    render() {
        return(
            <div>
                <SearchBar />
                <VideoDetail video={this.state.selectedVideo}/>
                <VideoList
                    onVideoSelect={(sv,f) => this.setState({videos: this.state.videos, selectedVideo: sv})}
                    videos={this.state.videos} />
            </div>
        );
    }
}
Reactdom.render(<App />, document.querySelector('.root'));
