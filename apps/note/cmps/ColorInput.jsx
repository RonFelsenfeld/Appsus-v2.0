

export function ColorInput({ onChangeColor, noteToEdit, }) {
    const colors = [
        'rgb(174, 204, 220)',
        '#B4FF9F',
        'rgb(226, 246, 211)',
        '#F9FFA4',
        '#FFD59E',
        '#FFA1A1',
        'rgb(211, 191, 219)',
        'rgb(246, 226, 221)'
    ]


    console.log(noteToEdit);
    return <section className="color-input">
        <div className="items-container flex space-around">
            {
                colors.map(color => <div key={color}
                    className={`item  + ${color === noteToEdit.style.backgroundColor ? 'selected' : ''}`}
                    onClick={() => onChangeColor(color)}
                    style={{ backgroundColor: color }}
                ></div>)
            }
        </div>

    </section>
} 