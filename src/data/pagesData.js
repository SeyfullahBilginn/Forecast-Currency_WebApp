import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import PersonIcon from '@mui/icons-material/Person';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { GiStairs } from "react-icons/gi";

const data = {
    "user": [
        { name: 'Currencies', icon: <CurrencyExchangeIcon />, to: "/" },
        { name: 'Rankings', icon: <GiStairs />, to: "/rankings" },
        { name: 'User', icon: <PersonIcon />, to: "/user" },
    ],
    "admin": [
        { name: 'Currencies', icon: <CurrencyExchangeIcon />, to: "/" },
        { name: 'Rankings', icon: <GiStairs />, to: "/rankings" },
        { name: 'User', icon: <PersonIcon />, to: "/user" },
        { name: 'Admin', icon: <AdminPanelSettingsIcon />, to: "/admin" },

    ]
}

export default function setMode(mode) {
    return data[mode]
}