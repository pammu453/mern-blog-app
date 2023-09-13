import "./header.css"

const Header = () => {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">React & Node</span>
        <span className="headerTitleLg">Blog</span>
      </div>
      <img className="headerImg" src="http://hdqwalls.com/wallpapers/tropical-beach-sunset-4k-sd.jpg" alt="" />
    </div>
  )
}

export default Header;
