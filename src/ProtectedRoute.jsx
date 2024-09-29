import {useUser} from './UserContext'
import SignInPopUp from './SignInPopUp'
import {useState, useEffect} from 'react'
import {AnimatePresence} from 'framer-motion'
import {useNavigate} from 'react-router-dom'
import PropTypes from 'prop-types'

const ProtectedRoute = ({children}) => {
    const navigate = useNavigate()
    const {user} = useUser()
    const [isPopUpOpen, setIsPopUpOpen] = useState(!user)

    const closePopUp = () => {
        setIsPopUpOpen(false)
        // If popup is closed without signing in, navigate to home
        if (!user) {
            navigate('/', { replace: true })
        }
    }

    // Effect to check if the user is logged in, and toggle the popup
    useEffect(() => {
        if (!user) {
            setIsPopUpOpen(true)
        }
    }, [user])

    // If user is signed in, return the protected component
    if (user) {
        return children
    }

    return (
        <AnimatePresence>
            {isPopUpOpen && <SignInPopUp closePopUp={closePopUp} />}
        </AnimatePresence>
    )
}
ProtectedRoute.propTypes = {
    children : PropTypes.node.isRequired
}
export default ProtectedRoute
