import { Container } from "react-bootstrap";
import "./_app.scss";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import HomeScreen from "./screens/HomeScreen/HomeScreen.js";
import { useState } from "react";
import { Route, Switch } from "react-router-dom";
import { Redirect } from "react-router";
import WatchScreen from "./screens/WatchScreen/WatchScreen.js";
import SearchScreen from "./screens/SearchScreen/SearchScreen.js";
import SubsScreen from "./screens/SubscriptionsScreen/SubsScreen.js";
import ChannelScreen from "./screens/ChannelScreen/ChannelScreen.js";
import LoginScreen from "./screens/LoginScreen/LoginScreen";

function App() {
  const Layout = ({ children }) => {
    const [toggleSidebar, setToggleSidebar] = useState(false);
    const handleToggleSidebar = () => setToggleSidebar(!toggleSidebar);

    return (
      <>
        <Header handleToggleSidebar={handleToggleSidebar} />
        <div className="app__container">
          <Sidebar
            toggleSidebar={toggleSidebar}
            handleToggleSidebar={handleToggleSidebar}
          />
          <Container fluid className="app__main">
            {children}
          </Container>
        </div>
      </>
    );
  };

  // const { accessToken, loading } = useSelector((state) => state.auth);
  // const history = useHistory();

  // useEffect(() => {
  //   if (!accessToken && !loading) {
  //     history.push("/login");
  //   }
  // }, [accessToken, loading, history]);

  return (
    <Switch>
      <Route exact path="/">
        <Layout>
          <HomeScreen />
        </Layout>
      </Route>
      <Route path="/login">
        <Layout>
          <LoginScreen />
        </Layout>
      </Route>
      <Route exact path="/watch/:id">
        <Layout>
          <WatchScreen />
        </Layout>
      </Route>
      <Route exact path="/search/:text">
        <Layout>
          <SearchScreen />
        </Layout>
      </Route>
      <Route exact path="/feed/subscriptions">
        <Layout>
          <SubsScreen />
        </Layout>
      </Route>
      <Route exact path="/channel/:channelId">
        <Layout>
          <ChannelScreen />
        </Layout>
      </Route>
      <Route>
        <Redirect to="/" />
      </Route>
    </Switch>
  );
}

export default App;
