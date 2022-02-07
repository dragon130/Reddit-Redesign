import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Comment from "./Comment";

const Comments = ({ comments }) => {
  return (
    <TreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {comments.map(x => {
        return <Comment key={x.data.id} comment={x} />;
      })}
    </TreeView>
  );
};

export default Comments;
