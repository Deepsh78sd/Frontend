
import { ReactNode } from "react";
import { Button } from "./ui/button";
import { Eye, Pencil, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

interface ActionButtonsProps {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  viewLabel?: string;
  editLabel?: string;
  deleteLabel?: string;
  deleteDialogTitle?: string;
  deleteDialogDescription?: string;
  hideView?: boolean;
  hideEdit?: boolean;
  hideDelete?: boolean;
  className?: string;
  align?: "left" | "right";
  variant?: "icon" | "text" | "full";
  size?: "sm" | "default";
  customButtons?: ReactNode;
}

const ActionButtons = ({
  onView,
  onEdit,
  onDelete,
  viewLabel = "View",
  editLabel = "Edit",
  deleteLabel = "Delete",
  deleteDialogTitle = "Are you sure?",
  deleteDialogDescription = "This action cannot be undone. This will permanently delete this item.",
  hideView = false,
  hideEdit = false,
  hideDelete = false,
  className = "",
  align = "right",
  variant = "icon",
  size = "sm",
  customButtons,
}: ActionButtonsProps) => {
  const showView = !hideView && onView;
  const showEdit = !hideEdit && onEdit;
  const showDelete = !hideDelete && onDelete;

  const alignmentClass = align === "right" ? "justify-end" : "justify-start";
  
  const renderViewButton = () => {
    if (variant === "icon") {
      return (
        <Button 
          variant="ghost" 
          size={size} 
          onClick={onView}
          title={viewLabel}
        >
          <Eye className="h-4 w-4" />
          <span className="sr-only">{viewLabel}</span>
        </Button>
      );
    } else if (variant === "text") {
      return (
        <Button 
          variant="ghost" 
          size={size} 
          onClick={onView}
        >
          <Eye className="h-4 w-4 mr-2" />
          {viewLabel}
        </Button>
      );
    } else {
      return (
        <Button 
          variant="outline" 
          size={size} 
          onClick={onView}
          className="w-full"
        >
          <Eye className="h-4 w-4 mr-2" />
          {viewLabel}
        </Button>
      );
    }
  };

  const renderEditButton = () => {
    if (variant === "icon") {
      return (
        <Button 
          variant="ghost" 
          size={size} 
          onClick={onEdit}
          title={editLabel}
        >
          <Pencil className="h-4 w-4" />
          <span className="sr-only">{editLabel}</span>
        </Button>
      );
    } else if (variant === "text") {
      return (
        <Button 
          variant="ghost" 
          size={size} 
          onClick={onEdit}
        >
          <Pencil className="h-4 w-4 mr-2" />
          {editLabel}
        </Button>
      );
    } else {
      return (
        <Button 
          variant="outline" 
          size={size} 
          onClick={onEdit}
          className="w-full"
        >
          <Pencil className="h-4 w-4 mr-2" />
          {editLabel}
        </Button>
      );
    }
  };

  const renderDeleteButton = () => {
    const deleteButton = variant === "icon" ? (
      <Button 
        variant="ghost" 
        size={size}
        className="text-red-500 hover:text-red-700 hover:bg-red-50"
        title={deleteLabel}
      >
        <Trash className="h-4 w-4" />
        <span className="sr-only">{deleteLabel}</span>
      </Button>
    ) : variant === "text" ? (
      <Button 
        variant="ghost" 
        size={size}
        className="text-red-500 hover:text-red-700 hover:bg-red-50"
      >
        <Trash className="h-4 w-4 mr-2" />
        {deleteLabel}
      </Button>
    ) : (
      <Button 
        variant="outline" 
        size={size}
        className="w-full text-red-500 hover:text-red-700 hover:bg-red-50"
      >
        <Trash className="h-4 w-4 mr-2" />
        {deleteLabel}
      </Button>
    );

    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          {deleteButton}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{deleteDialogTitle}</AlertDialogTitle>
            <AlertDialogDescription>
              {deleteDialogDescription}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={onDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };

  return (
    <div className={`flex gap-2 ${alignmentClass} ${className}`}>
      {showView && renderViewButton()}
      {showEdit && renderEditButton()}
      {showDelete && renderDeleteButton()}
      {customButtons}
    </div>
  );
};

export default ActionButtons;
