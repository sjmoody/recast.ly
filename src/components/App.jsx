import exampleVideoData from '../data/exampleVideoData.js';
import VideoList from './VideoList.js';
import VideoPlayer from './VideoPlayer.js';
import searchYouTube from '../lib/searchYouTube.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentVideo: {},
      allVideos: [],
      hasError: false
      // video: exampleVideoData[0],
      // videos: exampleVideoData
    };
    this.onVideoListEntryClick = this.onVideoListEntryClick.bind(this);
  }

  // static getDerivedStateFromError(error) {
  //   // Update state so the next render will show the fallback UI.
  //   return { hasError: true };
  // }

  onVideoListEntryClick(v) {
    console.log("onVideoListEntryClick");
    this.setState({currentVideo: v});
  }

  componentDidMount() {
    searchYouTube('', (response) => {
      this.setState({
        allVideos: response,
        currentVideo: response[0]
      });
    });
  }

  render() {
    // if (this.state.hasError) {
    //   return <h1>Something went wrong!</h1>;
    // }
    return (
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            <div><h5><em>search</em> view goes here</h5></div>
          </div>
        </nav>
        <div className="row">
          <div className="col-md-7">
            <VideoPlayer video={this.state.currentVideo} />
          </div>
          <div className="col-md-5">
            <VideoList videos={this.state.allVideos} onVideoListEntryClick={this.onVideoListEntryClick} />
          </div>
        </div>
      </div>
    );
  }
}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default App;
