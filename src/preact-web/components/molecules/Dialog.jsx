import { X } from 'preact-feather'
import { Backdrop, DialogBody, DialogBox, DialogCloseIcon, DialogHead, DialogTitle } from '../atoms/Modal'
import { ButtonBar } from '../atoms/Buttons'

export const Dialog = ({title, onClose, children, buttons, width, height, bodyStyle}) => {
    return <Backdrop visible>
        <DialogBox style={{width, height}}>
            <DialogHead>
                <DialogTitle>{title}</DialogTitle>
                {typeof onClose === 'function' && (
                    <DialogCloseIcon onClick={onClose}>
                        <X size={18} />
                    </DialogCloseIcon>
                )}
            </DialogHead>
            <DialogBody style={bodyStyle}>
                {children}
            </DialogBody>
            {buttons?.length !== 0 && <ButtonBar>
                {buttons}
            </ButtonBar>}
        </DialogBox>
    </Backdrop>
}
Dialog.defaultProps = {
    width: 400,
    height: 200
}
