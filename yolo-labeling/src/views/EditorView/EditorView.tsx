import './EditorView.css'
import LabelsWindow from './LabelsWindow/LabelsWindow'
import UploadWindow from './UploadWindow/UploadWindow'
import ImageBroswer from './ImageBroswer/ImageBroswer'
import NavigationBar from './NavigationBar/NavigationBar'
import TagManager from './TagManager/TagManager'
import LabelingArea from './LabelingArea/LabelingArea'
import { selectView, ViewsEnum } from '../../store/EditorViews/actions'
import { getViewCurrent } from '../../store/EditorViews/selectors'
import { useDispatch, useSelector } from 'react-redux'

const EditorView: React.FC = () => {
    const dispatch = useDispatch()
    const currentView = useSelector(getViewCurrent)
    let beforeWindow = <></>
    if (currentView === ViewsEnum.EditorView) {
        beforeWindow = <></>
    }
    else {
        switch (currentView) {
            case ViewsEnum.UploadWindow:
                beforeWindow = <UploadWindow />
                break;
            case ViewsEnum.LabelWindow:
                beforeWindow = <LabelsWindow />
                break;
        }
        beforeWindow = <div className='EditorView-before-container'
            onClick={(event) => {
                if (event.target === event.currentTarget) {
                    dispatch(selectView(ViewsEnum.EditorView));
                }
            }}

        >{beforeWindow}</div>
    }

    return (
        <div className="EditorView-container">

            <div className='EditorView-behind-container'
                style={currentView === ViewsEnum.EditorView ? {} : { filter: 'blur(3px)' }}
            >
                <div className="NavigationBar-container">
                    <NavigationBar />
                </div>
                <div className="main-container">
                    <div className="ImageBroswer-container">
                        <ImageBroswer />
                    </div>
                    <div className="LabelingArea-container">
                        <LabelingArea />
                    </div>
                    <div className="TagManager-container">
                        <TagManager />
                    </div>
                </div>
            </div>
            {beforeWindow}
        </div>
    )
}
export default EditorView


