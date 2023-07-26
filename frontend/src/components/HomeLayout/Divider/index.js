import "./Divider.css"

export default function Divider() {

    const handleMouseDown = (e) => {
        e.preventDefault();
        const container = document.querySelector(".homeTop")

        function _moveListener(e) {
            e.preventDefault();
            var mouseXInContainer = e.clientX - container.offsetLeft;
            var perc = (mouseXInContainer / container.offsetWidth) * 100;
        
            var sections = container.querySelectorAll('section');
            sections[0].style.flexBasis = perc + '%';
            sections[1].style.flexBasis = (100 - perc) + '%';
        }

        function _upListener(e) {
            e.preventDefault();
            container.removeEventListener('mousemove', _moveListener);
            document.removeEventListener('mouseup', _upListener);
        }

        container.addEventListener('mousemove', _moveListener);
        // best to make the ending event on the entire document to better catch it
        document.addEventListener('mouseup', _upListener);
        // });
    }

    return (
        <div className="divider" onMouseDown={handleMouseDown}></div>
    )
}