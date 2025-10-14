/**
 * ContactInfo Component
 * Displays contact information panel
 */

import { Card } from '@/components/ui/card';
import { Mail, MapPin } from 'lucide-react';
import { CONTACT_INFO, PAGE_CONTENT } from '@/config/constants';

export const ContactInfo: React.FC = () => {
  return (
    <Card className="p-6 shadow-soft bg-gradient-card h-full">
      <h2 className="text-2xl font-bold mb-6">{PAGE_CONTENT.contact.infoTitle}</h2>

      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
            <Mail className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold mb-1">Email</h3>
            <p className="text-sm text-muted-foreground">{CONTACT_INFO.email}</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
            <MapPin className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold mb-1">Location</h3>
            <p className="text-sm text-muted-foreground">
              {CONTACT_INFO.location}
              {CONTACT_INFO.locationDetails && (
                <>
                  <br />
                  {CONTACT_INFO.locationDetails}
                </>
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-border">
        <h3 className="font-semibold mb-2">Office Hours</h3>
        <p className="text-sm text-muted-foreground">
          {CONTACT_INFO.officeHours.weekday}
          <br />
          {CONTACT_INFO.officeHours.saturday}
          <br />
          {CONTACT_INFO.officeHours.sunday}
        </p>
      </div>
    </Card>
  );
};
