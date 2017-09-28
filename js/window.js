import { body, app, heading } from './elements';

const setAppDragAndDrop = () => {
    app.style.position = 'absolute';
    app.style.left = body.clientWidth - app.offsetWidth / 2;
    app.style.right = body.clientHeight - app.offsetHeight / 2;
    
    const mouseDownHandler = (evt) => {
        evt.preventDefault();
    
        const startCoords = {
            x: evt.clientX,
            y: evt.clientY
        };
    
        const mouseMoveHandler = (e) => {
            const shift = {
                x: e.clientX - startCoords.x,
                y: e.clientY - startCoords.y
            }
    
            startCoords.x = e.x;
            startCoords.y = e.y;
    
            app.style.top = app.offsetTop + shift.y + 'px';
            app.style.left = app.offsetLeft + shift.x + 'px';
        };
    
        const mouseUpHandler = () => {
            heading.removeEventListener('mousemove', mouseMoveHandler);
            heading.removeEventListener('mouseup', mouseUpHandler);
        };
    
        heading.addEventListener('mousemove', mouseMoveHandler);
        heading.addEventListener('mouseup', mouseUpHandler);
    };
    
    heading.addEventListener('mousedown', mouseDownHandler);
};

export default setAppDragAndDrop;
