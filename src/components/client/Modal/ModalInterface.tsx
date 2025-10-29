'use client'

export default function ModalInterface(props) {
  const { children, open, onClose, title } = props;

  // const handleClose = () => {}

  if(!open){
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="absolute inset-0 bg-black opacity-90"
      />
      <div className="relative z-10 max-w-4xl p-4 mx-auto min-h-screen flex items-center justify-center">
        <div className="modal relative bg-[var(--background)] p-4 md:p-10 rounded-lg w-full max-h-[90vh] flex flex-col">
          <div className="header flex flex-row justify-between items-center">
            <h3 className="header_title">{title}</h3>

            <button
              onClick={onClose}
              className="text-[var(--background)] bg-[var(--foreground)] hover:bg-opacity-75 cursor-pointer w-[30px] h-[30px] rounded-full"
            >
              <i className="uil uil-times text-2xl"/>
            </button>
          </div>
          <div className="content flex-1 overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
