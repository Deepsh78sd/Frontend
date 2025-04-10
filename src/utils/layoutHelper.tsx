
import { ReactNode } from "react";
import PageLayout from "../components/PageLayout";

/**
 * Helper function to wrap content in the consistent PageLayout component
 * This ensures all pages use the same navigation structure
 */
export function withPageLayout(children: ReactNode, userRole: 'admin' | 'shelter' | 'hospital' | 'adopter', userName: string = "User") {
  return (
    <PageLayout userRole={userRole} userName={userName}>
      {children}
    </PageLayout>
  );
}
