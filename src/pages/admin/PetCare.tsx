
import PageLayout from "@/components/PageLayout";
import PetCareInfo from "@/components/ui/pet-care-info";

const AdminPetCare = () => {
  return (
    <PageLayout userRole="admin" userName="Admin User">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Pet Care Information</h1>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          {/* Admin can add, edit, and delete pet care info */}
          <PetCareInfo canAdd={true} canEdit={true} canDelete={true} />
        </div>
      </div>
    </PageLayout>
  );
};

export default AdminPetCare;
