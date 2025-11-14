'use client';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useParams } from 'next/navigation';

interface Event {
  eventName: string;
  weekDay: string;
  date: string;
  location: string;
  locationLink: string;
}

interface SocialLink {
  platform: string;
  url: string;
}

interface InviteData {
  groomName: string;
  bridalName: string;
  shlok: string;
  groomFamilyName: string;
  bridalFamilyName: string;
  familyDetails: string;
  events: Event[];
  images: string[];
  whatsappLink: string;
  socialLinks: SocialLink[];
  counterDate: string;
  extraField1: string;
  extraField2: string;
  extraField3: string;
  extraField4: string;
}

export default function PublicInvite() {
  const params = useParams();
  const slug = params.slug as string;
  const [loading, setLoading] = useState(true);
  const [inviteData, setInviteData] = useState<InviteData | null>(null);

  useEffect(() => {
    fetchInvite();
  }, [slug]);

  const fetchInvite = async () => {
    try {
      const response = await fetch(`/api/invites/slug/${slug}`);
      if (response.ok) {
        const data = await response.json();
        setInviteData(data);
      }
    } catch (error) {
      console.error('Error fetching invite:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-pink-50 to-purple-50">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading invitation...</p>
        </div>
      </div>
    );
  }

  if (!inviteData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-pink-50 to-purple-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Invitation Not Found</h1>
          <p className="text-gray-600">This invitation may have been removed or the link is incorrect.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-50 via-purple-50 to-pink-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-linear-to-r from-purple-600 to-pink-600 text-white py-12 px-6 text-center">
            {inviteData.shlok && (
              <div className="mb-6 italic text-lg opacity-90">
                &quot;{inviteData.shlok}&quot;
              </div>
            )}
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {inviteData.groomName} & {inviteData.bridalName}
            </h1>
            {(inviteData.groomFamilyName || inviteData.bridalFamilyName) && (
              <p className="text-xl opacity-90">
                {inviteData.groomFamilyName && `S/O ${inviteData.groomFamilyName}`}
                {inviteData.groomFamilyName && inviteData.bridalFamilyName && ' & '}
                {inviteData.bridalFamilyName && `D/O ${inviteData.bridalFamilyName}`}
              </p>
            )}
          </div>

          {/* Family Details */}
          {inviteData.familyDetails && (
            <div className="px-6 py-8 bg-gray-50 text-center">
              <p className="text-gray-700 text-lg leading-relaxed">{inviteData.familyDetails}</p>
            </div>
          )}

          {/* Countdown */}
          {inviteData.counterDate && (
            <div className="px-6 py-8 text-center bg-white">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Countdown to the Big Day</h2>
              <div className="inline-block bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-lg px-8 py-6">
                <div className="text-5xl font-bold mb-2">
                  {dayjs(inviteData.counterDate).diff(dayjs(), 'day')}
                </div>
                <div className="text-lg">Days Remaining</div>
              </div>
            </div>
          )}

          {/* Events */}
          {inviteData.events.length > 0 && inviteData.events.some(e => e.eventName) && (
            <div className="px-6 py-8 bg-gray-50">
              <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Celebration Events</h2>
              <div className="space-y-4">
                {inviteData.events.map((event, index) => (
                  event.eventName && (
                    <div key={index} className="bg-white rounded-lg shadow p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="mb-4 md:mb-0">
                          <h3 className="text-xl font-semibold text-primary mb-2">{event.eventName}</h3>
                          {event.date && (
                            <p className="text-gray-600 mb-1">
                              📅 {dayjs(event.date).format('MMMM DD, YYYY')} ({event.weekDay})
                            </p>
                          )}
                          {event.location && (
                            <p className="text-gray-600">📍 {event.location}</p>
                          )}
                        </div>
                        {event.locationLink && (
                          <a
                            href={event.locationLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition inline-block text-center"
                          >
                            View Map
                          </a>
                        )}
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>
          )}

          {/* Image Gallery */}
          {inviteData.images.length > 0 && (
            <div className="px-6 py-8 bg-white">
              <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Our Moments</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {inviteData.images.map((url, index) => (
                  <div key={index} className="relative h-48 rounded-lg overflow-hidden shadow-lg">
                    <img
                      src={url}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Extra Fields */}
          {(inviteData.extraField1 || inviteData.extraField2 || inviteData.extraField3 || inviteData.extraField4) && (
            <div className="px-6 py-8 bg-gray-50">
              <div className="space-y-4 text-center">
                {inviteData.extraField1 && (
                  <p className="text-gray-700 text-lg">{inviteData.extraField1}</p>
                )}
                {inviteData.extraField2 && (
                  <p className="text-gray-700 text-lg">{inviteData.extraField2}</p>
                )}
                {inviteData.extraField3 && (
                  <p className="text-gray-700 text-lg">{inviteData.extraField3}</p>
                )}
                {inviteData.extraField4 && (
                  <p className="text-gray-700 text-lg">{inviteData.extraField4}</p>
                )}
              </div>
            </div>
          )}

          {/* Contact & Social */}
          {(inviteData.whatsappLink || inviteData.socialLinks.some(l => l.url)) && (
            <div className="px-6 py-8 bg-white text-center">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">Stay Connected</h2>
              <div className="flex flex-wrap justify-center gap-4">
                {inviteData.whatsappLink && (
                  <a
                    href={inviteData.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    WhatsApp
                  </a>
                )}
                {inviteData.socialLinks.map((link, index) => (
                  link.url && (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition"
                    >
                      {link.platform || 'Link'}
                    </a>
                  )
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="bg-linear-to-r from-purple-600 to-pink-600 text-white py-8 px-6 text-center">
            <p className="text-lg mb-2">We look forward to celebrating with you!</p>
            <p className="text-sm opacity-75">Created with WeddingInvites</p>
          </div>
        </div>
      </div>
    </div>
  );
}
