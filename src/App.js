import React, { useState, useEffect, useMemo } from 'react'
import merge from 'deepmerge'
import config, { players } from './config'
import styles, { playerSize } from './styles'

const NPCs = {}

const playersWithNPCs = {
    ...players,
    ...NPCs
}

const defaultState = {
    ...config,
    players: Object.keys(playersWithNPCs).reduce((acc, key, index) => {
        const player = playersWithNPCs[key]

        acc[key] = {
            ...player, x: playerSize / 2, y: (playerSize / 2) + index * playerSize
        }

        return acc
    }, {})
}

const App = () => {
    const [state, setState] = useState(defaultState)
    const [selected, setSelected] = useState()
    const { map, autosave } = useMemo(() => {
        const url = new URL(window.location.href)

        return {
            map: url.searchParams.get('map'),
            autosave: !!url.searchParams.get('autosave')
        }
    }, [])

    useEffect(() => {
        try {
            const savedState = JSON.parse(localStorage.getItem(map))
            setState((currentState) => merge(
                currentState, savedState || {}
            ))
        } catch (e) {
            console.error(new Error('No state saved'))
        }
    }, [map])

    useEffect(() => {
        if (!selected) {
            return undefined
        }

        const player = {
            ...state.players[selected]
        }

        document.onkeydown = ({ keyCode }) => {
            switch (keyCode) {
            case 37:
                player.x -= playerSize
                break
            case 38:
                player.y -= playerSize
                break
            case 39:
                player.x += playerSize
                break
            case 40:
                player.y += playerSize
                break
            default:
                break
            }

            setState((current) => {
                const updatedPlayers = {
                    ...current.players
                }

                updatedPlayers[selected] = player

                return {
                    ...current,
                    players: updatedPlayers
                }
            })

            if (autosave) {
                localStorage.setItem(map, JSON.stringify(state))
            }
        }

        return () => {
            document.onkeydown = undefined
        }
    }, [selected, map, autosave, state])

    const { DM } = state

    return (
        <div style={styles.app}>
            <div style={styles.container}>
                <img style={styles.map} src={map} alt="Map" />
                {Object.keys(state.players).map((key) => {
                    const player = state.players[key]

                    const playerStyle = {
                        ...styles.player,
                        top: player.y,
                        left: player.x
                    }

                    const avatarProps = {
                        style: {
                            ...styles.playerAvatar,
                            borderColor: selected === key
                                ? styles.selectedPlayer
                                : undefined,
                            backgroundColor: player.color || 'gray'
                        },
                        src: player.avatar ? player.avatar : undefined,
                        alt: player.name,
                        title: player.name
                    }

                    return (
                        <div
                            key={player.name}
                            style={playerStyle}
                            role="button"
                            tabIndex="0"
                            onClick={() => {
                                setSelected(() => key)
                            }}
                            onKeyPress={undefined}
                        >
                            {avatarProps.src
                                ? <img {...avatarProps} alt={avatarProps.alt} />
                                : <div {...avatarProps} />}
                        </div>
                    )
                })}
                {!!DM && (
                    <div style={styles.DM}>
                        <img
                            style={styles.DMAvatar}
                            src={DM.avatar ? DM.avatar : undefined}
                            alt={DM.name}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default App
