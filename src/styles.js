export const playerSize = 38
export const playerBorderWidth = 1.5

export default {
    player: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        outline: 'none',
        cursor: 'pointer'
    },
    DM: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        outline: 'none',
        bottom: playerSize / 2,
        right: playerSize / 2
    },
    DMAvatar: {
        width: playerSize * 2,
        height: playerSize * 2,
        background: '#000000',
        borderRadius: playerSize,
        boxSizing: 'border-box',
        border: `${playerBorderWidth}px solid #ffffff`
    },
    playerAvatar: {
        width: playerSize - playerBorderWidth * 2,
        height: playerSize - playerBorderWidth * 2,
        background: '#000000',
        borderRadius: (playerSize - playerBorderWidth * 2) / 2,
        boxSizing: 'border-box',
        border: `${playerBorderWidth}px solid #000000`
    },
    selectedPlayer: 'yellow'
}
