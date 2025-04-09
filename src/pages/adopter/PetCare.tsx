
import AdopterLayout from "@/components/layouts/AdopterLayout";
import PetCareInfo from "@/components/ui/pet-care-info";

const AdopterPetCare = () => {
  return (
    <AdopterLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Pet Care Information</h1>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          {/* Adopters can only view pet care info, not add/edit/delete */}
          <PetCareInfo canAdd={false} canEdit={false} canDelete={false} />
        </div>
      </div>
    </AdopterLayout>
  );
};

export default AdopterPetCare;
