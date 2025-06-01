import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"

const plans = [
  {
    name: "Prime Lite",
    priceMonthly: "₹67",
    priceYearly: null,
    features: [
      { category: "Prime Video", text: "Watch on", details: "Mobile, TV", included: true },
      { category: "Prime Video", text: "Number of devices", details: "1", included: true },
      { category: "Prime Video", text: "Maximum video quality", details: "HD (720p)", included: true },
      { category: "Prime Delivery", text: "Unlimited FREE delivery", details: "", included: true },
      { category: "Prime Delivery", text: "Same-day, 1-day delivery", details: "", included: true },
      { category: "Prime Shopping", text: "Exclusive Prime deals and early access", details: "", included: true },
      { category: "Prime Shopping", text: "5% Cashback on Amazon Pay Credit card", details: "", included: true },
      { category: "Prime Music", text: "100M songs, 15M podcasts, ad-free", details: "", included: false },
      { category: "Prime Reading", text: "Free ebooks on Kindle app", details: "", included: false },
      { category: "Prime Gaming", text: "Free games on mobile, PC, and console", details: "", included: false },
    ],
    ctaMonthly: "Prime Lite",
    ctaYearly: null,
  },
  {
    name: "Prime",
    priceMonthly: "₹125",
    priceYearly: "₹299", // This seems to be a typo in the image, usually annual is cheaper per month. Assuming it's a different tier or special offer. For now, I'll use the values as shown.
    features: [
      { category: "Prime Video", text: "Watch on", details: "Mobile, Laptop, TV", included: true },
      { category: "Prime Video", text: "Number of devices", details: "S (2 TVs)", included: true }, // Assuming S means multiple, and 2 TVs
      { category: "Prime Video", text: "Maximum video quality", details: "4K UHD (2160p)", included: true },
      { category: "Prime Delivery", text: "Unlimited FREE delivery", details: "", included: true },
      { category: "Prime Delivery", text: "Same-day, 1-day delivery", details: "", included: true },
      { category: "Prime Shopping", text: "Exclusive Prime deals and early access", details: "", included: true },
      { category: "Prime Shopping", text: "5% Cashback on Amazon Pay Credit card", details: "", included: true },
      { category: "Prime Music", text: "100M songs, 15M podcasts, ad-free", details: "", included: true },
      { category: "Prime Reading", text: "Free ebooks on Kindle app", details: "", included: true },
      { category: "Prime Gaming", text: "Free games on mobile, PC, and console", details: "", included: true },
    ],
    ctaMonthly: "Prime",
    ctaYearly: "Prime",
  },
]

const featureCategories = [
  "Prime Video",
  "Prime Delivery",
  "Prime Shopping",
  "Prime Music",
  "Prime Reading",
  "Prime Gaming",
]

export default function JoinPrimePage() {
  return (
    <div className="min-h-screen bg-neutral-900 text-white py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-10">
          <Image
            src="https://m.media-amazon.com/images/G/01/digital/video/web/logo-min-remaster.png"
            alt="Prime Video Logo"
            width={120}
            height={37}
            className="mx-auto mb-4"
          />
          <h1 className="text-3xl font-semibold mb-2">Watch now, cancel anytime</h1>
          <p className="text-4xl font-bold text-sky-400">Start your membership today</p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Choose a Prime plan. <span className="text-neutral-400">Change or cancel anytime</span>
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr>
                  <th className="py-4 px-3 text-left font-normal text-neutral-400 w-2/5"></th>
                  {plans.map((plan) => (
                    <th key={plan.name} className="py-4 px-3 text-center font-semibold text-lg w-3/10">
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {featureCategories.map((category) => (
                  <>
                    <tr key={category} className="bg-neutral-800/30">
                      <td colSpan={plans.length + 1} className="py-3 px-3 font-semibold text-neutral-300">
                        {category}
                      </td>
                    </tr>
                    {plans[0].features
                      .filter((f) => f.category === category)
                      .map((feature, index) => (
                        <tr key={`${category}-${index}`} className="border-b border-neutral-700 last:border-b-0">
                          <td className="py-3 px-3 text-neutral-300">{feature.text}</td>
                          {plans.map((plan) => {
                            const planFeature = plan.features.find(
                              (pf) => pf.category === category && pf.text === feature.text,
                            )
                            return (
                              <td key={`${plan.name}-${category}-${index}`} className="py-3 px-3 text-center">
                                {planFeature?.details && (
                                  <span className="block text-sm text-sky-400 mb-1">{planFeature.details}</span>
                                )}
                                {planFeature?.included ? (
                                  <Check className="h-6 w-6 text-green-400 mx-auto" />
                                ) : (
                                  <X className="h-6 w-6 text-red-400 mx-auto" />
                                )}
                              </td>
                            )
                          })}
                        </tr>
                      ))}
                  </>
                ))}
                {/* Pricing Row */}
                <tr className="bg-neutral-800/30">
                  <td className="py-4 px-3"></td>
                  {plans.map((plan) => (
                    <td key={`${plan.name}-pricing`} className="py-4 px-3 text-center">
                      {plan.priceMonthly && (
                        <Button
                          variant="outline"
                          className="w-full mb-2 border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white"
                        >
                          {plan.ctaMonthly} {plan.priceMonthly} / month*
                        </Button>
                      )}
                      {plan.priceYearly && (
                        <Button
                          variant="outline"
                          className="w-full border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white"
                        >
                          {plan.ctaYearly} {plan.priceYearly} / month*
                        </Button>
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-sky-500 hover:bg-sky-600 text-white px-10 py-6 text-lg">
            Join Prime annual
          </Button>
          <p className="text-xs text-neutral-400 mt-2">*when paid annually (₹1499/year)</p>
        </div>

        <footer className="text-center mt-16 pt-8 border-t border-neutral-700">
          <Image
            src="https://m.media-amazon.com/images/G/01/digital/video/web/logo-min-remaster.png"
            alt="Prime Video Logo"
            width={100}
            height={31}
            className="mx-auto mb-4"
          />
          <div className="text-xs text-neutral-400 space-x-4">
            <a href="#" className="hover:text-sky-400">
              Terms and Privacy Notice
            </a>
            <a href="#" className="hover:text-sky-400">
              Send us feedback
            </a>
            <a href="#" className="hover:text-sky-400">
              Help
            </a>
          </div>
          <p className="text-xs text-neutral-500 mt-2">© 1996-2025, Amazon.com, Inc. or its affiliates</p>
        </footer>
      </div>
    </div>
  )
}
