import React, {useState, useEffect} from 'react'
import {AiOutlineMenu} from 'react-icons/ai'
import {CgProfile} from 'react-icons/cg'
import {FiLogOut} from 'react-icons/fi'
import Popup from 'reactjs-popup'
import { Link } from 'react-router-dom'
import Logout from "../../popups/logout"
import './index.scss'
import { useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min'

const sidebarTabs=[{tab: 'dashboard', imgLink: '/sidebarTabs/home.jpg'}, {tab: 'transactions', imgLink: '/sidebarTabs/transfer.jpg'}, {tab: 'profile', imgLink: '/sidebarTabs/profile.jpg'}]

function Sidebar() {
    const [logoutState, setLogout] = useState(false)
    const {loginUserId, userData } = useSelector((state)=>state.transaction)
    const [isMenubarActive, setMenuBar] = useState(true)
    const [mobileView, setMobileView] = useState(true)

    const getActiveSidebar=()=>{
        const data = JSON.parse(localStorage.getItem('PinScaleBank'))
        if(data){
            return data.activeSidebar || 'dashboard'
        } return 'dashboard'
    }
    const [activeTab, setActiveTab] = useState(getActiveSidebar())

    const setLogoutState=()=>{
        setLogout(!logoutState)
    }
    const onLogout=()=>{
        localStorage.removeItem('PinScaleBank')
        window.location.reload();
    }

    const setActiveSidebar=(tab)=>{
        setActiveTab(tab)
        const data = JSON.parse(localStorage.getItem('PinScaleBank'))
        localStorage.setItem('PinScaleBank', JSON.stringify({...data, activeSidebar: tab}))
    }

    useEffect(()=>{
        const handleWindowSize=()=>{
            if(window.innerWidth < 600){
                setMobileView(true)
            }else{
                setMobileView(false)
            }
        }
        handleWindowSize()

        window.addEventListener('resize', handleWindowSize)

        return ()=>{
            window.removeEventListener('resize', handleWindowSize)
        }
    },[])
    
  return (
    <div className='sidebar'>
            <div className='header'>
                <div className='navbarLogo'>
                    <img src='/logo/logo.jpg' alt='logo' className='logo' />
                    <img src='/logo/Money Matters.png' alt='' className='manMatters' />
                </div>
                <div className='mobileMenu'>
                        <Popup
                            trigger={<button className='profile'><CgProfile /></button>}
                            position={'bottom center'}
                            on={'hover'}
                            closeOnDocumentClick
                        >
                            <div className='tooltip'>
                                <p>Name</p>
                                <p>Email</p>
                            </div>
                        </Popup>
                        <FiLogOut className='logout' onClick={onLogout} />
                        <button onClick={()=>{setMenuBar(!isMenubarActive)}}><AiOutlineMenu /></button>
                </div>
            </div>
            <div className='tabsSection'>
                <ul className='sidebarTabs' style={mobileView ? {display: isMenubarActive ? 'block' : 'none', marginBottom: '10px'} : {}}>
                    {sidebarTabs.map(item=>(
                    <Link to={`/${item.tab}`} style={{textDecoration: 'none'}}><li className={item.tab===activeTab && 'activeTab'} key={item.tab} onClick={()=>setActiveSidebar(item.tab)}>
                        <img src={item.imgLink} alt={item.tab} />
                        {(loginUserId === 3 && item.tab==='Transactions') ? (<p>All Transactions</p>) : <p>{item.tab}</p> }
                    </li></Link>
                    ))}
                </ul>
                <button className='logoutSection' onClick={()=>{setLogout(!logoutState)}}>
                    <img src='/Avatar.png' alt='adminProfile' />
                    <div>
                        <p>{userData?.name || 'Name' }</p>
                        <p>{userData?.email || 'Email' }</p>
                    </div>
                    <FiLogOut className='logoutIcon' />
                </button>
            </div>
            {logoutState && <Logout logoutState={logoutState} setLogoutState={setLogoutState} /> }
        </div>
  )
}

export default withRouter(Sidebar)