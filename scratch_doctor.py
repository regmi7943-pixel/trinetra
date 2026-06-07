import re

def process_file():
    with open('src/app/(public)/doctor/DoctorClient.tsx', 'r') as f:
        code = f.read()

    # Add imports
    imports = 'import { EditableText } from "@/components/EditableText";\nimport { EditableImage } from "@/components/EditableImage";\n'
    code = code.replace('import { motion } from "motion/react";', 'import { motion } from "motion/react";\n' + imports)

    # Props
    code = code.replace('export default function DoctorPage() {', 'interface DoctorClientProps {\n  content: Record<string, string>;\n}\n\nexport default function DoctorClient({ content }: DoctorClientProps) {')

    # Image
    code = re.sub(
        r'<img\s+src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d\?w=600&q=80"\s+alt="Bijay Regmi - Lead Optometrist"\s+className="w-full max-w-sm object-cover aspect-\[3/4\]"\s+loading="eager"\s*/>',
        r'<EditableImage page="doctor" contentKey="hero_image" defaultSrc={content["hero_image"] || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80"} alt="Bijay Regmi - Lead Optometrist" fill className="object-cover aspect-[3/4]" />',
        code
    )

    code = code.replace(
        '<p className="text-white font-serif text-xl font-bold">\n                      Bijay Regmi\n                    </p>',
        '<EditableText page="doctor" contentKey="hero_img_name" defaultText={content["hero_img_name"] || "Bijay Regmi"} as="p" className="text-white font-serif text-xl font-bold" />'
    )

    code = code.replace(
        '<p className="text-white/80 text-sm">\n                      Lead Optometrist & Founder\n                    </p>',
        '<EditableText page="doctor" contentKey="hero_img_role" defaultText={content["hero_img_role"] || "Lead Optometrist & Founder"} as="p" className="text-white/80 text-sm" />'
    )

    # Hero Info
    code = code.replace(
        '<span className="text-sm font-semibold tracking-[0.2em] uppercase text-[#D4A574]">\n                    Our Doctor\n                  </span>',
        '<EditableText page="doctor" contentKey="hero_badge" defaultText={content["hero_badge"] || "Our Doctor"} as="span" className="text-sm font-semibold tracking-[0.2em] uppercase text-[#D4A574]" />'
    )

    code = code.replace(
        '<h1 className="text-4xl md:text-5xl font-serif font-bold text-[var(--color-chocolate,#2C1810)] mb-3 leading-tight">\n                  Bijay Regmi\n                </h1>',
        '<EditableText page="doctor" contentKey="hero_name" defaultText={content["hero_name"] || "Bijay Regmi"} as="h1" className="text-4xl md:text-5xl font-serif font-bold text-[var(--color-chocolate,#2C1810)] mb-3 leading-tight" />'
    )

    code = code.replace(
        '<p className="text-xl text-[#D4A574] font-medium mb-6">\n                  Lead Optometrist & Founder\n                </p>',
        '<EditableText page="doctor" contentKey="hero_role" defaultText={content["hero_role"] || "Lead Optometrist & Founder"} as="p" className="text-xl text-[#D4A574] font-medium mb-6" />'
    )

    code = code.replace(
        '''<p className="text-lg text-[#5C4033] leading-relaxed mb-6">
                  With over 15 years of international experience across Germany and
                  the Middle East, Bijay brings world-class optometric
                  expertise to Nepal. His vision is simple: every person deserves
                  access to the highest quality eye care, delivered with genuine
                  compassion.
                </p>''',
        '''<EditableText page="doctor" contentKey="hero_desc" defaultText={content["hero_desc"] || "With over 15 years of international experience across Germany and the Middle East, Bijay brings world-class optometric expertise to Nepal. His vision is simple: every person deserves access to the highest quality eye care, delivered with genuine compassion."} as="p" className="text-lg text-[#5C4033] leading-relaxed mb-6" />'''
    )

    code = code.replace(
        '<span>Trained in Germany & Middle East</span>',
        '<EditableText page="doctor" contentKey="stat_1" defaultText={content["stat_1"] || "Trained in Germany & Middle East"} as="span" />'
    )

    code = code.replace(
        '<span>15+ Years Experience</span>',
        '<EditableText page="doctor" contentKey="stat_2" defaultText={content["stat_2"] || "15+ Years Experience"} as="span" />'
    )

    # Milestones
    code = code.replace('milestones.map((item) => {', 'milestones.map((item, i) => {')
    code = code.replace(
        '''<p className="text-3xl font-serif font-bold text-[var(--color-chocolate,#2C1810)] mb-1">
                    {item.value}
                  </p>''',
        '''<EditableText page="doctor" contentKey={`milestone_val_${i}`} defaultText={content[`milestone_val_${i}`] || item.value} as="p" className="text-3xl font-serif font-bold text-[var(--color-chocolate,#2C1810)] mb-1" />'''
    )
    code = code.replace(
        '''<p className="text-xs text-[#5C4033] uppercase tracking-wider">
                    {item.label}
                  </p>''',
        '''<EditableText page="doctor" contentKey={`milestone_lbl_${i}`} defaultText={content[`milestone_lbl_${i}`] || item.label} as="p" className="text-xs text-[#5C4033] uppercase tracking-wider" />'''
    )

    # Bio
    code = code.replace(
        '<span className="text-sm font-semibold tracking-[0.2em] uppercase text-[#D4A574]">\n              Biography\n            </span>',
        '<EditableText page="doctor" contentKey="bio_badge" defaultText={content["bio_badge"] || "Biography"} as="span" className="text-sm font-semibold tracking-[0.2em] uppercase text-[#D4A574]" />'
    )
    code = code.replace(
        '''<p className="bio-line text-lg text-[#5C4033] leading-relaxed">
              Bijay Regmi&rsquo;s journey in optometry is one of relentless
              pursuit of excellence and deep commitment to serving others. After
              completing his initial studies with top honors, he embarked on a
              career that would take him across continents to refine his clinical skills.
            </p>''',
        '''<p className="bio-line text-lg text-[#5C4033] leading-relaxed">
              <EditableText page="doctor" contentKey="bio_p1" defaultText={content["bio_p1"] || "Bijay Regmi's journey in optometry is one of relentless pursuit of excellence and deep commitment to serving others. After completing his initial studies with top honors, he embarked on a career that would take him across continents to refine his clinical skills."} as="span" />
            </p>'''
    )
    code = code.replace(
        '''<p className="bio-line text-lg text-[#5C4033] leading-relaxed">
              In Germany, Bijay completed extensive training in advanced diagnostics
              and ocular surface care, working alongside leading European
              optometrists and gaining hands-on experience with the most
              advanced diagnostic technologies available. This rigorous training
              sharpened his technical precision and instilled in him a commitment
              to evidence-based practice.
            </p>''',
        '''<p className="bio-line text-lg text-[#5C4033] leading-relaxed">
              <EditableText page="doctor" contentKey="bio_p2" defaultText={content["bio_p2"] || "In Germany, Bijay completed extensive training in advanced diagnostics and ocular surface care, working alongside leading European optometrists and gaining hands-on experience with the most advanced diagnostic technologies available. This rigorous training sharpened his technical precision and instilled in him a commitment to evidence-based practice."} as="span" />
            </p>'''
    )
    code = code.replace(
        '''<p className="bio-line text-lg text-[#5C4033] leading-relaxed">
              His subsequent years in the Middle East further broadened his
              expertise, exposing him to a diverse patient population and a wide
              spectrum of optometric conditions. During this time, he conducted
              thousands of comprehensive eye assessments and specialized contact
              lens fittings, building a reputation for clinical excellence and
              compassionate care.
            </p>''',
        '''<p className="bio-line text-lg text-[#5C4033] leading-relaxed">
              <EditableText page="doctor" contentKey="bio_p3" defaultText={content["bio_p3"] || "His subsequent years in the Middle East further broadened his expertise, exposing him to a diverse patient population and a wide spectrum of optometric conditions. During this time, he conducted thousands of comprehensive eye assessments and specialized contact lens fittings, building a reputation for clinical excellence and compassionate care."} as="span" />
            </p>'''
    )
    code = code.replace(
        '''<p className="bio-line text-lg text-[#5C4033] leading-relaxed">
              Returning to Nepal, Bijay founded Trinetra Eye Care Center with
              a singular mission: to ensure that every Nepali has access to the
              same quality of eye care available anywhere in the world. Under his
              leadership, the center has grown into a trusted institution,
              combining cutting-edge technology with the kind of personal attention
              that makes patients feel truly cared for.
            </p>''',
        '''<p className="bio-line text-lg text-[#5C4033] leading-relaxed">
              <EditableText page="doctor" contentKey="bio_p4" defaultText={content["bio_p4"] || "Returning to Nepal, Bijay founded Trinetra Eye Care Center with a singular mission: to ensure that every Nepali has access to the same quality of eye care available anywhere in the world. Under his leadership, the center has grown into a trusted institution, combining cutting-edge technology with the kind of personal attention that makes patients feel truly cared for."} as="span" />
            </p>'''
    )

    # Philosophy Quote
    code = code.replace(
        '''<blockquote className="text-xl md:text-2xl font-serif text-[var(--color-chocolate,#2C1810)] leading-relaxed mb-6 italic">
              &ldquo;The eyes are not just organs — they are windows to the soul and
              gateways to the world. Every patient who entrusts me with their
              vision entrusts me with their life&rsquo;s most precious gift. I carry
              that responsibility with humility and unwavering dedication.&rdquo;
            </blockquote>''',
        '''<EditableText page="doctor" contentKey="quote_text" defaultText={content["quote_text"] || "“The eyes are not just organs — they are windows to the soul and gateways to the world. Every patient who entrusts me with their vision entrusts me with their life’s most precious gift. I carry that responsibility with humility and unwavering dedication.”"} as="blockquote" className="text-xl md:text-2xl font-serif text-[var(--color-chocolate,#2C1810)] leading-relaxed mb-6 italic" />'''
    )
    code = code.replace(
        '<p className="font-semibold text-[var(--color-chocolate,#2C1810)]">\n                  Bijay Regmi\n                </p>',
        '<EditableText page="doctor" contentKey="quote_author" defaultText={content["quote_author"] || "Bijay Regmi"} as="p" className="font-semibold text-[var(--color-chocolate,#2C1810)]" />'
    )
    code = code.replace(
        '<p className="text-sm text-[#5C4033]">\n                  Founder, Trinetra Eye Care Center\n                </p>',
        '<EditableText page="doctor" contentKey="quote_author_role" defaultText={content["quote_author_role"] || "Founder, Trinetra Eye Care Center"} as="p" className="text-sm text-[#5C4033]" />'
    )

    # Qualifications
    code = code.replace(
        '<h2 className="text-2xl md:text-3xl font-serif font-bold text-[var(--color-chocolate,#2C1810)]">\n                  Qualifications & Training\n                </h2>',
        '<EditableText page="doctor" contentKey="qual_title" defaultText={content["qual_title"] || "Qualifications & Training"} as="h2" className="text-2xl md:text-3xl font-serif font-bold text-[var(--color-chocolate,#2C1810)]" />'
    )
    code = code.replace(
        '<span className="text-[#5C4033] leading-relaxed">\n                        {qual}\n                      </span>',
        '<EditableText page="doctor" contentKey={`qual_${index}`} defaultText={content[`qual_${index}`] || qual} as="span" className="text-[#5C4033] leading-relaxed" />'
    )

    # Clinical Approach
    code = code.replace(
        '<h2 className="text-2xl md:text-3xl font-serif font-bold text-[var(--color-chocolate,#2C1810)]">\n                  Clinical Approach\n                </h2>',
        '<EditableText page="doctor" contentKey="approach_title" defaultText={content["approach_title"] || "Clinical Approach"} as="h2" className="text-2xl md:text-3xl font-serif font-bold text-[var(--color-chocolate,#2C1810)]" />'
    )
    code = code.replace(
        '<p className="text-[#5C4033] leading-relaxed mb-4">\n                  Bijay&rsquo;s clinical philosophy centers on three pillars:\n                </p>',
        '<EditableText page="doctor" contentKey="approach_desc" defaultText={content["approach_desc"] || "Bijay’s clinical philosophy centers on three pillars:"} as="p" className="text-[#5C4033] leading-relaxed mb-4" />'
    )
    code = code.replace(
        '<p className="font-semibold text-[var(--color-chocolate,#2C1810)] mb-1">\n                        Patient-Centered Care\n                      </p>',
        '<EditableText page="doctor" contentKey="approach_p1_title" defaultText={content["approach_p1_title"] || "Patient-Centered Care"} as="p" className="font-semibold text-[var(--color-chocolate,#2C1810)] mb-1" />'
    )
    code = code.replace(
        '''<p className="text-sm text-[#5C4033]">
                        Every treatment plan is tailored to the individual, taking
                        into account their lifestyle, needs, and concerns.
                      </p>''',
        '''<EditableText page="doctor" contentKey="approach_p1_desc" defaultText={content["approach_p1_desc"] || "Every treatment plan is tailored to the individual, taking into account their lifestyle, needs, and concerns."} as="p" className="text-sm text-[#5C4033]" />'''
    )
    code = code.replace(
        '<p className="font-semibold text-[var(--color-chocolate,#2C1810)] mb-1">\n                        Evidence-Based Medicine\n                      </p>',
        '<EditableText page="doctor" contentKey="approach_p2_title" defaultText={content["approach_p2_title"] || "Evidence-Based Medicine"} as="p" className="font-semibold text-[var(--color-chocolate,#2C1810)] mb-1" />'
    )
    code = code.replace(
        '''<p className="text-sm text-[#5C4033]">
                        All decisions are grounded in the latest research and
                        proven clinical methodologies from around the world.
                      </p>''',
        '''<EditableText page="doctor" contentKey="approach_p2_desc" defaultText={content["approach_p2_desc"] || "All decisions are grounded in the latest research and proven clinical methodologies from around the world."} as="p" className="text-sm text-[#5C4033]" />'''
    )
    code = code.replace(
        '<p className="font-semibold text-[var(--color-chocolate,#2C1810)] mb-1">\n                        Continuous Innovation\n                      </p>',
        '<EditableText page="doctor" contentKey="approach_p3_title" defaultText={content["approach_p3_title"] || "Continuous Innovation"} as="p" className="font-semibold text-[var(--color-chocolate,#2C1810)] mb-1" />'
    )
    code = code.replace(
        '''<p className="text-sm text-[#5C4033]">
                        Staying at the forefront of optometric advances through
                        ongoing training, conferences, and research participation.
                      </p>''',
        '''<EditableText page="doctor" contentKey="approach_p3_desc" defaultText={content["approach_p3_desc"] || "Staying at the forefront of optometric advances through ongoing training, conferences, and research participation."} as="p" className="text-sm text-[#5C4033]" />'''
    )

    # Specializations
    code = code.replace(
        '<span className="text-sm font-semibold tracking-[0.2em] uppercase text-[#D4A574] mb-3 block">\n              Specializations\n            </span>',
        '<EditableText page="doctor" contentKey="spec_badge" defaultText={content["spec_badge"] || "Specializations"} as="span" className="text-sm font-semibold tracking-[0.2em] uppercase text-[#D4A574] mb-3 block" />'
    )
    code = code.replace(
        '<h2 className="text-3xl md:text-4xl font-serif font-bold text-[var(--color-chocolate,#2C1810)] mb-4">\n              Areas of Expertise\n            </h2>',
        '<EditableText page="doctor" contentKey="spec_title" defaultText={content["spec_title"] || "Areas of Expertise"} as="h2" className="text-3xl md:text-4xl font-serif font-bold text-[var(--color-chocolate,#2C1810)] mb-4" />'
    )
    code = code.replace('expertiseAreas.map((area) => (', 'expertiseAreas.map((area, index) => (')
    code = code.replace(
        '{area}',
        '<EditableText page="doctor" contentKey={`expertise_${index}`} defaultText={content[`expertise_${index}`] || area} as="span" />'
    )

    # CTA Section
    code = code.replace(
        '<h2 className="text-3xl md:text-4xl font-serif font-bold text-[var(--color-chocolate,#2C1810)] mb-6">\n              Consult with Bijay Regmi\n            </h2>',
        '<EditableText page="doctor" contentKey="cta_title" defaultText={content["cta_title"] || "Consult with Bijay Regmi"} as="h2" className="text-3xl md:text-4xl font-serif font-bold text-[var(--color-chocolate,#2C1810)] mb-6" />'
    )
    code = code.replace(
        '''<p className="text-lg text-[#5C4033] mb-8 leading-relaxed">
              Take the first step towards clearer vision. Book a personal
              consultation with Bijay Regmi and experience the care of a
              world-class optometrist.
            </p>''',
        '''<EditableText page="doctor" contentKey="cta_desc" defaultText={content["cta_desc"] || "Take the first step towards clearer vision. Book a personal consultation with Bijay Regmi and experience the care of a world-class optometrist."} as="p" className="text-lg text-[#5C4033] mb-8 leading-relaxed" />'''
    )
    code = code.replace(
        'Book a Consultation\n              <Stethoscope className="w-5 h-5" />',
        '<EditableText page="doctor" contentKey="cta_btn" defaultText={content["cta_btn"] || "Book a Consultation"} as="span" />\n              <Stethoscope className="w-5 h-5" />'
    )

    with open('src/app/(public)/doctor/DoctorClient.tsx', 'w') as f:
        f.write(code)

process_file()
