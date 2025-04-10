import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router'
import { Icon } from '@iconify/react'
import { Dock } from '@krislorem/ui'
import type { DockItem } from '@krislorem/ui'
const Home = () => <div>Home Page</div>
const About = () => <div>About Page</div>
const Contact = () => <div>Contact Page</div>

const AppContent = () => {
  const navigate = useNavigate();
  const dockItems: DockItem[] = [
    {
      id: 'home',
      icon: <Icon icon="mdi:home" width="24" />,
      label: 'Home',
      onClick: () => navigate('/')
    },
    {
      id: 'about',
      icon: <Icon icon="mdi:information" width="24" />,
      label: 'About',
      onClick: () => navigate('/about')
    },
    {
      id: 'contact',
      icon: <Icon icon="mdi:email" width="24" />,
      label: 'Contact',
      onClick: () => navigate('/contact')
    }
  ]

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Dock items={dockItems} />
    </>
  )
}

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
