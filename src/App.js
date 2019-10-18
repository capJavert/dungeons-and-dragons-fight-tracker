import React, { useState, useEffect } from 'react'

const App = () => {
    const [map, setMap] = useState()
    useEffect(() => {
        const { href } = window.location
        const url = new URL(href)
        const map = url.searchParams.get('map')

        setMap(map)
    }, [])

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#000000' }}>
            {false && <div style={{ display: 'flex', flex: 1, backgroundImage: `url("${map}")`, backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} />}
            <div>
                <img style={{ width: '100%', height: 'auto' }} src={map} alt="Map" />
            </div>
        </div>
    );
}

export default App
