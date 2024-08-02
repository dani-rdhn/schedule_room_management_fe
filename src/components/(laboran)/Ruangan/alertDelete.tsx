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
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

interface AlertDialogDemoProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  mutate: () => void;
}

export function AlertDialogDelete({ isOpen, onOpenChange, onConfirm }: AlertDialogDemoProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      {/* <AlertDialogTrigger asChild>
        <Button variant="outline">Show Dialog</Button>
      </AlertDialogTrigger> */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {/* <AlertDialogCancel onClick={() => onOpenChange(false)}>Cancel</AlertDialogCancel> */}
          {/* <button className="bg-blue-600 font-bold px-4 md:py-2 py-4 rounded-lg text-white text-sm" onClick={() => onOpenChange(false)}>Cancel</button> */}
          <button className=" bg-gray-200 hover:bg-gray-300 font-bold px-4 md:py-3 py-4 rounded-lg text-black text-sm" onClick={() => onOpenChange(false)}>Cancel</button>
          <DropdownMenuSeparator />
          <button className="bg-red-600 font-bold px-4 md:py-2 py-4 rounded-lg text-white text-sm" onClick={onConfirm}>Delete</button>
          {/* <AlertDialogAction onClick={onConfirm}>Continue</AlertDialogAction> */}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
