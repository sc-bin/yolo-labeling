import './EditorView.css'
import ImageBroswer from './ImageBroswer/ImageBroswer'
import NavigationBar from './NavigationBar/NavigationBar'
import TagManager from './TagManager/TagManager'
import LabelingArea from './LabelingArea/LabelingArea'


const EditorView: React.FC = () => {
    return (
        <div className="view-container">
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
    )
}
export default EditorView


