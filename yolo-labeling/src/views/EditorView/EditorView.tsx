import './EditorView.css'
import UploadWindow from './UploadWindow/UploadWindow'
import ImageBroswer from './ImageBroswer/ImageBroswer'
import NavigationBar from './NavigationBar/NavigationBar'
import TagManager from './TagManager/TagManager'
import LabelingArea from './LabelingArea/LabelingArea'
import { ViewsEnum } from '../../store/EditorViews/actions'
import { getViewCurrent } from '../../store/EditorViews/selectors'
import { useSelector } from 'react-redux'

const EditorView: React.FC = () => {
    const currentView = useSelector(getViewCurrent)

    return (
        <div className="EditorView-container">

            <div className='EditorView-behind-container'
                style={currentView === ViewsEnum.EditorView ? {} : { filter: 'blur(10px)' }}
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
            {currentView == ViewsEnum.UploadWindow ? <UploadWindow /> : <></>}

        </div>
    )
}
export default EditorView


