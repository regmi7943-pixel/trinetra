import re

def process_file():
    with open('src/app/(public)/about/AboutClient.tsx', 'r') as f:
        code = f.read()

    # Add imports
    imports = 'import { EditableText } from "@/components/EditableText";\nimport { EditableImage } from "@/components/EditableImage";\n'
    code = code.replace('import { motion } from "motion/react";', 'import { motion } from "motion/react";\n' + imports)
    code = code.replace('import { Target, Eye, Heart, Award, CheckCircle2 } from "lucide-react";', 'import { Target, Eye, Heart, Award, CheckCircle2, HeartHandshake } from "lucide-react";')

    # Props
    code = code.replace('export default function AboutPage() {', 'interface AboutClientProps {\n  content: Record<string, string>;\n}\n\nexport default function AboutClient({ content }: AboutClientProps) {')

    # Hero section
    code = re.sub(
        r'<h1 className="about-hero-title([^"]*)">\s*About Trinetra Eye Care\s*</h1>',
        r'<EditableText page="about" contentKey="hero_title" defaultText={content["hero_title"] || "About Trinetra Eye Care"} as="h1" className="about-hero-title\1" />',
        code
    )

    code = re.sub(
        r'<p className="about-hero-subtitle([^"]*)">\s*A center of excellence in ophthalmic care, where world-class\s*expertise meets heartfelt compassion in the heart of Nepal.\s*</p>',
        r'<EditableText page="about" contentKey="hero_subtitle" defaultText={content["hero_subtitle"] || "A center of excellence in ophthalmic care, where world-class expertise meets heartfelt compassion in the heart of Nepal."} as="p" className="about-hero-subtitle\1" />',
        code
    )

    # Our Story
    code = re.sub(
        r'<span className="text-sm font-semibold tracking-\[0\.2em\] uppercase text-\[\#D4A574\]">\s*Our Story\s*</span>',
        r'<EditableText page="about" contentKey="story_badge" defaultText={content["story_badge"] || "Our Story"} as="span" className="text-sm font-semibold tracking-[0.2em] uppercase text-[#D4A574]" />',
        code
    )

    code = re.sub(
        r'<h2 className="story-line text-3xl md:text-4xl font-serif font-bold text-\[var\(--color-chocolate,\#2C1810\)\] leading-snug">\s*A Vision Born from Global Experience\s*</h2>',
        r'<EditableText page="about" contentKey="story_title" defaultText={content["story_title"] || "A Vision Born from Global Experience"} as="h2" className="story-line text-3xl md:text-4xl font-serif font-bold text-[var(--color-chocolate,#2C1810)] leading-snug" />',
        code
    )

    code = code.replace(
        'Bijay Regmi\n                <div className="hidden sm:flex h-6 w-px bg-[var(--color-warm-border)] mx-1"></div>',
        '<EditableText page="about" contentKey="story_doctor_name" defaultText={content["story_doctor_name"] || "Bijay Regmi"} as="span" />\n                <div className="hidden sm:flex h-6 w-px bg-[var(--color-warm-border)] mx-1"></div>'
    )
    
    code = code.replace(
        '<span>Lead Optometrist</span>',
        '<EditableText page="about" contentKey="story_doctor_role" defaultText={content["story_doctor_role"] || "Lead Optometrist"} as="span" />'
    )

    code = code.replace(
        '''<p className="text-base sm:text-lg text-[var(--color-chocolate-muted)] leading-relaxed">
                Trinetra Eye Care Center was founded by Bijay Regmi, a dedicated optometrist who spent over{" "}
                <strong className="text-[var(--color-chocolate)]">15 years</strong> honing his clinical skills across Germany and the Middle East.
              </p>''',
        '''<p className="text-base sm:text-lg text-[var(--color-chocolate-muted)] leading-relaxed">
                <EditableText page="about" contentKey="story_p1" defaultText={content["story_p1"] || "Trinetra Eye Care Center was founded by Bijay Regmi, a dedicated optometrist who spent over 15 years honing his clinical skills across Germany and the Middle East."} />
              </p>'''
    )

    code = code.replace(
        '''<p className="text-[var(--color-chocolate-muted)] text-base sm:text-lg leading-relaxed mb-6">
              During his years abroad, Bijay trained at some of the world&rsquo;s most prestigious vision institutions, mastering advanced diagnostic techniques and adopting patient care philosophies that prioritize both precision and empathy.
            </p>''',
        '''<p className="text-[var(--color-chocolate-muted)] text-base sm:text-lg leading-relaxed mb-6">
              <EditableText page="about" contentKey="story_p2" defaultText={content["story_p2"] || "During his years abroad, Bijay trained at some of the world's most prestigious vision institutions, mastering advanced diagnostic techniques and adopting patient care philosophies that prioritize both precision and empathy."} />
            </p>'''
    )
    
    code = code.replace(
        '''<p className="story-line text-lg text-[#5C4033] leading-relaxed">
              Driven by a deep desire to bring world-class eye care to his
              homeland, he returned to Nepal and established Trinetra Eye Care
              Center — a place where international standards of treatment meet the
              warmth and understanding of a community-focused practice.
            </p>''',
        '''<p className="story-line text-lg text-[#5C4033] leading-relaxed">
              <EditableText page="about" contentKey="story_p3" defaultText={content["story_p3"] || "Driven by a deep desire to bring world-class eye care to his homeland, he returned to Nepal and established Trinetra Eye Care Center — a place where international standards of treatment meet the warmth and understanding of a community-focused practice."} />
            </p>'''
    )

    code = code.replace(
        '''<p className="story-line text-lg text-[#5C4033] leading-relaxed">
              The name{" "}
              <span className="italic font-serif text-[var(--color-chocolate,#2C1810)]">
                &ldquo;Trinetra&rdquo;
              </span>{" "}
              — meaning &ldquo;three eyes&rdquo; — symbolizes our commitment to seeing beyond
              the surface: to understand each patient&rsquo;s unique needs, to envision
              the best possible outcomes, and to watch over our community&rsquo;s eye
              health with unwavering dedication.
            </p>''',
        '''<p className="story-line text-lg text-[#5C4033] leading-relaxed">
              <EditableText page="about" contentKey="story_p4" defaultText={content["story_p4"] || "The name “Trinetra” — meaning “three eyes” — symbolizes our commitment to seeing beyond the surface: to understand each patient's unique needs, to envision the best possible outcomes, and to watch over our community's eye health with unwavering dedication."} />
            </p>'''
    )

    # Mission and Vision
    code = code.replace(
        '<h2 className="text-3xl md:text-4xl font-serif font-bold text-[var(--color-chocolate,#2C1810)] mb-4">\n              Mission & Vision\n            </h2>',
        '<EditableText page="about" contentKey="mission_vision_title" defaultText={content["mission_vision_title"] || "Mission & Vision"} as="h2" className="text-3xl md:text-4xl font-serif font-bold text-[var(--color-chocolate,#2C1810)] mb-4" />'
    )

    code = code.replace(
        '<h3 className="text-2xl font-serif font-bold text-[var(--color-chocolate,#2C1810)] mb-4">\n                Our Mission\n              </h3>',
        '<EditableText page="about" contentKey="mission_title" defaultText={content["mission_title"] || "Our Mission"} as="h3" className="text-2xl font-serif font-bold text-[var(--color-chocolate,#2C1810)] mb-4" />'
    )

    code = code.replace(
        '''<p className="text-[#5C4033] leading-relaxed">
                To provide accessible, compassionate, and world-class ophthalmic
                care to every individual who walks through our doors. We strive to
                combine the latest advancements in eye care technology with a
                deeply personal approach to patient well-being, ensuring that
                quality eye health services are within reach for all.
              </p>''',
        '''<EditableText page="about" contentKey="mission_desc" defaultText={content["mission_desc"] || "To provide accessible, compassionate, and world-class ophthalmic care to every individual who walks through our doors. We strive to combine the latest advancements in eye care technology with a deeply personal approach to patient well-being, ensuring that quality eye health services are within reach for all."} as="p" className="text-[#5C4033] leading-relaxed" />'''
    )

    code = code.replace(
        '<h3 className="text-2xl font-serif font-bold text-[var(--color-chocolate,#2C1810)] mb-4">\n                Our Vision\n              </h3>',
        '<EditableText page="about" contentKey="vision_title" defaultText={content["vision_title"] || "Our Vision"} as="h3" className="text-2xl font-serif font-bold text-[var(--color-chocolate,#2C1810)] mb-4" />'
    )

    code = code.replace(
        '''<p className="text-[#5C4033] leading-relaxed">
                To be the most trusted name in eye care across Nepal — a center
                where patients receive treatment that rivals the best in the
                world. We envision a future where preventable blindness is
                eliminated and every person has access to the gift of clear,
                healthy vision throughout their life.
              </p>''',
        '''<EditableText page="about" contentKey="vision_desc" defaultText={content["vision_desc"] || "To be the most trusted name in eye care across Nepal — a center where patients receive treatment that rivals the best in the world. We envision a future where preventable blindness is eliminated and every person has access to the gift of clear, healthy vision throughout their life."} as="p" className="text-[#5C4033] leading-relaxed" />'''
    )

    # Core Values Header
    code = code.replace(
        '<span className="text-sm font-semibold tracking-[0.2em] uppercase text-[#D4A574] mb-3 block">\n              What We Stand For\n            </span>',
        '<EditableText page="about" contentKey="values_badge" defaultText={content["values_badge"] || "What We Stand For"} as="span" className="text-sm font-semibold tracking-[0.2em] uppercase text-[#D4A574] mb-3 block" />'
    )

    code = code.replace(
        '<h2 className="text-3xl md:text-4xl font-serif font-bold text-[var(--color-chocolate,#2C1810)] mb-4">\n              Our Core Values\n            </h2>',
        '<EditableText page="about" contentKey="values_title" defaultText={content["values_title"] || "Our Core Values"} as="h2" className="text-3xl md:text-4xl font-serif font-bold text-[var(--color-chocolate,#2C1810)] mb-4" />'
    )

    # Values mapping replacement
    # Desktop
    code = code.replace(
        '<h3 className="text-xl font-bold text-[#1A1A1A] mb-3">\n                      {value.title}\n                    </h3>',
        '<EditableText page="about" contentKey={`value_title_${i}`} defaultText={content[`value_title_${i}`] || value.title} as="h3" className="text-xl font-bold text-[#1A1A1A] mb-3" />'
    )
    code = code.replace(
        '<p className="text-sm text-[#1A1A1A]/80 leading-relaxed flex-1">\n                      {value.description}\n                    </p>',
        '<EditableText page="about" contentKey={`value_desc_${i}`} defaultText={content[`value_desc_${i}`] || value.description} as="p" className="text-sm text-[#1A1A1A]/80 leading-relaxed flex-1" />'
    )
    
    # Mobile
    code = code.replace(
        '<h3 className="text-xl font-bold text-[#1A1A1A] mb-3">\n                    {value.title}\n                  </h3>',
        '<EditableText page="about" contentKey={`value_title_${index}`} defaultText={content[`value_title_${index}`] || value.title} as="h3" className="text-xl font-bold text-[#1A1A1A] mb-3" />'
    )
    code = code.replace(
        '<p className="text-sm text-[#1A1A1A]/80 leading-relaxed flex-1">\n                    {value.description}\n                  </p>',
        '<EditableText page="about" contentKey={`value_desc_${index}`} defaultText={content[`value_desc_${index}`] || value.description} as="p" className="text-sm text-[#1A1A1A]/80 leading-relaxed flex-1" />'
    )

    # Facility header
    code = code.replace(
        '<span className="text-sm font-semibold tracking-[0.2em] uppercase text-[#D4A574] mb-3 block">\n                Our Facility\n              </span>',
        '<EditableText page="about" contentKey="facility_badge" defaultText={content["facility_badge"] || "Our Facility"} as="span" className="text-sm font-semibold tracking-[0.2em] uppercase text-[#D4A574] mb-3 block" />'
    )
    code = code.replace(
        '<h2 className="text-3xl md:text-4xl font-serif font-bold text-[var(--color-chocolate,#2C1810)] mb-4">\n                State-of-the-Art Care Environment\n              </h2>',
        '<EditableText page="about" contentKey="facility_title" defaultText={content["facility_title"] || "State-of-the-Art Care Environment"} as="h2" className="text-3xl md:text-4xl font-serif font-bold text-[var(--color-chocolate,#2C1810)] mb-4" />'
    )

    # Facility Image map
    # facilityImages.map((image) => ... -> facilityImages.map((image, index) => ...
    code = code.replace('facilityImages.map((image) => (', 'facilityImages.map((image, index) => (')

    # Note: image tags might be self-closing or not
    code = re.sub(
        r'<img\s+src=\{image\.src\}\s+alt=\{image\.alt\}\s+className="w-full h-full object-cover"\s+loading="lazy"\s*/>',
        r'<EditableImage page="about" contentKey={`facility_image_${index}`} defaultSrc={content[`facility_image_${index}`] || image.src} alt={image.alt} fill className="object-cover" />',
        code
    )
    
    code = code.replace(
        '<span className="text-lg font-bold text-white tracking-wide">\n                        {image.label}\n                      </span>',
        '<EditableText page="about" contentKey={`facility_label_${index}`} defaultText={content[`facility_label_${index}`] || image.label} as="span" className="text-lg font-bold text-white tracking-wide" />'
    )

    # CTA
    code = code.replace(
        '<h2 className="text-3xl md:text-4xl font-serif font-bold text-[var(--color-chocolate,#2C1810)] mb-6">\n              Experience the Trinetra Difference\n            </h2>',
        '<EditableText page="about" contentKey="cta_title" defaultText={content["cta_title"] || "Experience the Trinetra Difference"} as="h2" className="text-3xl md:text-4xl font-serif font-bold text-[var(--color-chocolate,#2C1810)] mb-6" />'
    )
    code = code.replace(
        '''<p className="text-lg text-[#5C4033] mb-8 leading-relaxed">
              Join thousands of patients who trust us with their vision. Schedule
              your consultation today and discover compassionate, world-class eye
              care.
            </p>''',
        '''<EditableText page="about" contentKey="cta_desc" defaultText={content["cta_desc"] || "Join thousands of patients who trust us with their vision. Schedule your consultation today and discover compassionate, world-class eye care."} as="p" className="text-lg text-[#5C4033] mb-8 leading-relaxed" />'''
    )
    
    code = code.replace(
        'Book an Appointment\n              <CheckCircle2 className="w-5 h-5" />',
        '<EditableText page="about" contentKey="cta_btn" defaultText={content["cta_btn"] || "Book an Appointment"} as="span" />\n              <CheckCircle2 className="w-5 h-5" />'
    )

    with open('src/app/(public)/about/AboutClient.tsx', 'w') as f:
        f.write(code)

process_file()
