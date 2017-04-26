import React, { Component } from 'react';
import Reactdom from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail'
import _ from 'lodash';
const API_KEY = 'AIzaSyAIrKHcTWzoM0OFAiQx6bZUJH-5xVUNiFM';


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            videos: [],
            selectedVideo: null
        };
        this.videoSearch('Naruto');
    }
    videoSearch(term) {
        YTSearch({key: API_KEY, term: term}, (videos) => {
            console.log(videos);
            this.setState({
                videos: videos,
                selectedVideo: videos[0]
            });
        });
    }
    render() {
        const videoSearch = _.debouce
        return(
            <div>
                <SearchBar onSearchTermChange={term =>this.videoSearch(term)} />
                <VideoDetail video={this.state.selectedVideo}/>
                <VideoList
                    onVideoSelect={(sv,f) => this.setState({videos: this.state.videos, selectedVideo: sv})}
                    videos={this.state.videos} />
            </div>
        );
    }
}
Reactdom.render(<App />, document.querySelector('.root'));
