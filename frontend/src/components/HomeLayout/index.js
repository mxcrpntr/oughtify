import Divider from "./Divider";
import Home from "./Home";
import HomeAndSearch from "./HomeAndSearch";
import HomeNavigation from "./HomeNavigation";
import Library from "./Library";
import Playbar from "./Playbar";
import "./HomeLayout.css"
import LibraryNavigation from "./LibraryNavigation";

export default function HomeLayout() {
    
    return (
        <div className="homeLayout">
            <div className="homeTop">
                <section className="left">
                    <HomeAndSearch />
                    <LibraryNavigation />
                    <Library />
                </section>
                <Divider />
                <section className="right">
                    <Home />
                    <HomeNavigation />
                </section>
            </div>
            <Playbar />
        </div>
    )
}