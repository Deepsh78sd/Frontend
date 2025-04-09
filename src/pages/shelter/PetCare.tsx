
import ShelterLayout from "@/components/layouts/ShelterLayout";
import PetCareInfo from "@/components/ui/pet-care-info";

const ShelterPetCare = () => {
  return (
    <ShelterLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Pet Care Information</h1>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <PetCareInfo canAdd={true} canEdit={true} canDelete={true} />
        </div>
      </div>
    </ShelterLayout>
  );
};

export default ShelterPetCare;
