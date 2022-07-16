import exampleVideoData from '../data/exampleVideoData.js';
import VideoList from './VideoList.js';
import VideoPlayer from './VideoPlayer.js';
import searchYouTube from '../lib/searchYouTube.js';
import Search from './Search.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentVideo: {},
      allVideos: [],
      hasError: false,
      isSearching: false
      // video: exampleVideoData[0],
      // videos: exampleVideoData
    };
    this.onVideoListEntryClick = this.onVideoListEntryClick.bind(this);
    this.handleOnInputChange = this.handleOnInputChange.bind(this);
  }

  // static getDerivedStateFromError(error) {
  //   // Update state so the next render will show the fallback UI.
  //   return { hasError: true };
  // }

  // func on searchBoxChange(){make a new youtube search}

  // or setinterval and get state from search box every 500ms

  handleOnInputChange(event) {
    const query = event.target.value;
    // console.log(event);

    this.setState({query: query});

    // Check state. If isSearch true, wait 500 ms and then try.
    if (this.state.isSearching) {
      console.log("too many searches");


    } else {
    // if isSearch is false, change to true and run Search

      this.setState({
        isSearching: true
      });
      console.log('searching youtube for ' + query);

      searchYouTube(query, (response) => {
        // Trying to debug error here where searches fail after a few renders
        if (response.error) { console.log("error in search"); }
        this.setState({
          allVideos: response,
          currentVideo: response[0],
          isSearching: false
        });
      });

    }

  }

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
    if (this.state.allVideos.length > 0 ) {
      return (
        <div>
          <nav className="navbar">
            <div className="col-md-6 offset-md-3">
              <div>
                <Search handleOnInputChange={this.handleOnInputChange} />
              </div>
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

    } else {
      return (
        <div>
          <nav className="navbar">
            <div className="col-md-6 offset-md-3">
              <div>
                <Search handleOnInputChange={this.handleOnInputChange} />
              </div>
            </div>
          </nav>
          <h1>No Results Found</h1>
          <div className="video-player"></div>
          <div className='video-list'></div>
        </div>
      );
    }

  }
}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default App;
