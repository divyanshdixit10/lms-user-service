import React, { useState } from 'react';

const ResumeBuilderPage: React.FC = () => {
  // State for resume data
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      address: '',
      linkedin: '',
      website: '',
    },
    summary: '',
    experience: [
      {
        id: 1,
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
      }
    ],
    education: [
      {
        id: 1,
        institution: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        gpa: ''
      }
    ],
    skills: ['']
  });
  
  // State for active section
  const [activeSection, setActiveSection] = useState<'info' | 'summary' | 'experience' | 'education' | 'skills'>('info');
  
  // State for template selection
  const [selectedTemplate, setSelectedTemplate] = useState<'modern' | 'classic' | 'creative'>('modern');
  
  // Handlers for updating resume data
  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setResumeData({
      ...resumeData,
      personalInfo: {
        ...resumeData.personalInfo,
        [name]: value
      }
    });
  };
  
  const handleSummaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResumeData({
      ...resumeData,
      summary: e.target.value
    });
  };
  
  const handleExperienceChange = (id: number, field: string, value: string | boolean) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    });
  };
  
  const addExperience = () => {
    const newId = resumeData.experience.length > 0 
      ? Math.max(...resumeData.experience.map(e => e.id)) + 1 
      : 1;
    
    setResumeData({
      ...resumeData,
      experience: [
        ...resumeData.experience,
        {
          id: newId,
          company: '',
          position: '',
          startDate: '',
          endDate: '',
          current: false,
          description: ''
        }
      ]
    });
  };
  
  const removeExperience = (id: number) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.filter(exp => exp.id !== id)
    });
  };
  
  const handleEducationChange = (id: number, field: string, value: string) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    });
  };
  
  const addEducation = () => {
    const newId = resumeData.education.length > 0 
      ? Math.max(...resumeData.education.map(e => e.id)) + 1 
      : 1;
    
    setResumeData({
      ...resumeData,
      education: [
        ...resumeData.education,
        {
          id: newId,
          institution: '',
          degree: '',
          field: '',
          startDate: '',
          endDate: '',
          gpa: ''
        }
      ]
    });
  };
  
  const removeEducation = (id: number) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.filter(edu => edu.id !== id)
    });
  };
  
  const handleSkillChange = (index: number, value: string) => {
    const newSkills = [...resumeData.skills];
    newSkills[index] = value;
    setResumeData({
      ...resumeData,
      skills: newSkills
    });
  };
  
  const addSkill = () => {
    setResumeData({
      ...resumeData,
      skills: [...resumeData.skills, '']
    });
  };
  
  const removeSkill = (index: number) => {
    setResumeData({
      ...resumeData,
      skills: resumeData.skills.filter((_, i) => i !== index)
    });
  };
  
  // Function to generate resume PDF
  const generateResume = () => {
    // This would integrate with a PDF generation library like jsPDF
    console.log('Generating resume with data:', resumeData);
    alert('Your resume is being generated! This feature would download a PDF in a real application.');
  };
  
  return (
    <div className="bg-neutral-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Resume Builder</h1>
          <p className="text-gray-600 mt-2">Create a professional resume in minutes. Our AI will help you optimize it for ATS systems.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Editor */}
          <div className="lg:col-span-2">
            <div className="card overflow-hidden mb-6">
              {/* Tab Navigation */}
              <div className="tabs px-6">
                <button 
                  className={`tab ${activeSection === 'info' ? 'tab-active' : ''}`}
                  onClick={() => setActiveSection('info')}
                >
                  Personal Info
                </button>
                <button 
                  className={`tab ${activeSection === 'summary' ? 'tab-active' : ''}`}
                  onClick={() => setActiveSection('summary')}
                >
                  Summary
                </button>
                <button 
                  className={`tab ${activeSection === 'experience' ? 'tab-active' : ''}`}
                  onClick={() => setActiveSection('experience')}
                >
                  Experience
                </button>
                <button 
                  className={`tab ${activeSection === 'education' ? 'tab-active' : ''}`}
                  onClick={() => setActiveSection('education')}
                >
                  Education
                </button>
                <button 
                  className={`tab ${activeSection === 'skills' ? 'tab-active' : ''}`}
                  onClick={() => setActiveSection('skills')}
                >
                  Skills
                </button>
              </div>
              
              {/* Tab Content */}
              <div className="p-6">
                {/* Personal Info Section */}
                {activeSection === 'info' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Personal Information</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      This information will appear at the top of your resume.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="form-group">
                        <label htmlFor="name" className="form-label">Full Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={resumeData.personalInfo.name}
                          onChange={handlePersonalInfoChange}
                          className="input"
                          placeholder="John Doe"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={resumeData.personalInfo.email}
                          onChange={handlePersonalInfoChange}
                          className="input"
                          placeholder="johndoe@example.com"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="phone" className="form-label">Phone Number</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={resumeData.personalInfo.phone}
                          onChange={handlePersonalInfoChange}
                          className="input"
                          placeholder="(123) 456-7890"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="address" className="form-label">Location</label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={resumeData.personalInfo.address}
                          onChange={handlePersonalInfoChange}
                          className="input"
                          placeholder="City, State"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="linkedin" className="form-label">LinkedIn (optional)</label>
                        <input
                          type="text"
                          id="linkedin"
                          name="linkedin"
                          value={resumeData.personalInfo.linkedin}
                          onChange={handlePersonalInfoChange}
                          className="input"
                          placeholder="linkedin.com/in/johndoe"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="website" className="form-label">Website (optional)</label>
                        <input
                          type="text"
                          id="website"
                          name="website"
                          value={resumeData.personalInfo.website}
                          onChange={handlePersonalInfoChange}
                          className="input"
                          placeholder="johndoe.com"
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Summary Section */}
                {activeSection === 'summary' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Professional Summary</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Write a short, compelling summary of your professional background and strengths.
                    </p>
                    
                    <div className="form-group">
                      <textarea
                        rows={6}
                        value={resumeData.summary}
                        onChange={handleSummaryChange}
                        className="input"
                        placeholder="Experienced software developer with 5+ years of experience in building web applications..."
                      ></textarea>
                    </div>
                    
                    <div className="flex justify-end">
                      <button className="btn btn-primary">
                        AI Enhance
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Experience Section */}
                {activeSection === 'experience' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Work Experience</h3>
                      <button 
                        onClick={addExperience}
                        className="btn btn-primary btn-sm"
                      >
                        Add Experience
                      </button>
                    </div>
                    
                    {resumeData.experience.map((exp) => (
                      <div key={exp.id} className="card-bordered p-4 relative">
                        <button 
                          onClick={() => removeExperience(exp.id)}
                          className="absolute top-2 right-2 text-gray-400 hover:text-error"
                          title="Remove experience"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="form-group">
                            <label className="form-label">Company Name</label>
                            <input
                              type="text"
                              value={exp.company}
                              onChange={(e) => handleExperienceChange(exp.id, 'company', e.target.value)}
                              className="input"
                              placeholder="Google"
                            />
                          </div>
                          
                          <div className="form-group">
                            <label className="form-label">Job Title</label>
                            <input
                              type="text"
                              value={exp.position}
                              onChange={(e) => handleExperienceChange(exp.id, 'position', e.target.value)}
                              className="input"
                              placeholder="Senior Software Engineer"
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="form-group">
                            <label className="form-label">Start Date</label>
                            <input
                              type="month"
                              value={exp.startDate}
                              onChange={(e) => handleExperienceChange(exp.id, 'startDate', e.target.value)}
                              className="input"
                            />
                          </div>
                          
                          <div className="form-group">
                            <label className="form-label">End Date</label>
                            <div className="space-y-2">
                              <input
                                type="month"
                                value={exp.endDate}
                                onChange={(e) => handleExperienceChange(exp.id, 'endDate', e.target.value)}
                                className="input"
                                disabled={exp.current}
                              />
                              <div className="flex items-center">
                                <input
                                  type="checkbox"
                                  id={`current-${exp.id}`}
                                  checked={exp.current}
                                  onChange={(e) => handleExperienceChange(exp.id, 'current', e.target.checked)}
                                  className="mr-2"
                                />
                                <label htmlFor={`current-${exp.id}`} className="text-sm">
                                  I currently work here
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="form-group">
                          <label className="form-label">Description</label>
                          <textarea
                            rows={4}
                            value={exp.description}
                            onChange={(e) => handleExperienceChange(exp.id, 'description', e.target.value)}
                            className="input"
                            placeholder="Describe your responsibilities and achievements..."
                          ></textarea>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Education Section */}
                {activeSection === 'education' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Education</h3>
                      <button 
                        onClick={addEducation}
                        className="btn btn-primary btn-sm"
                      >
                        Add Education
                      </button>
                    </div>
                    
                    {resumeData.education.map((edu) => (
                      <div key={edu.id} className="card-bordered p-4 relative">
                        <button 
                          onClick={() => removeEducation(edu.id)}
                          className="absolute top-2 right-2 text-gray-400 hover:text-error"
                          title="Remove education"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="form-group">
                            <label className="form-label">Institution</label>
                            <input
                              type="text"
                              value={edu.institution}
                              onChange={(e) => handleEducationChange(edu.id, 'institution', e.target.value)}
                              className="input"
                              placeholder="University of California, Berkeley"
                            />
                          </div>
                          
                          <div className="form-group">
                            <label className="form-label">Degree</label>
                            <input
                              type="text"
                              value={edu.degree}
                              onChange={(e) => handleEducationChange(edu.id, 'degree', e.target.value)}
                              className="input"
                              placeholder="Bachelor of Science"
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="form-group">
                            <label className="form-label">Field of Study</label>
                            <input
                              type="text"
                              value={edu.field}
                              onChange={(e) => handleEducationChange(edu.id, 'field', e.target.value)}
                              className="input"
                              placeholder="Computer Science"
                            />
                          </div>
                          
                          <div className="form-group">
                            <label className="form-label">GPA (optional)</label>
                            <input
                              type="text"
                              value={edu.gpa}
                              onChange={(e) => handleEducationChange(edu.id, 'gpa', e.target.value)}
                              className="input"
                              placeholder="3.8"
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="form-group">
                            <label className="form-label">Start Date</label>
                            <input
                              type="month"
                              value={edu.startDate}
                              onChange={(e) => handleEducationChange(edu.id, 'startDate', e.target.value)}
                              className="input"
                            />
                          </div>
                          
                          <div className="form-group">
                            <label className="form-label">End Date (or Expected)</label>
                            <input
                              type="month"
                              value={edu.endDate}
                              onChange={(e) => handleEducationChange(edu.id, 'endDate', e.target.value)}
                              className="input"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Skills Section */}
                {activeSection === 'skills' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Skills</h3>
                      <button 
                        onClick={addSkill}
                        className="btn btn-primary btn-sm"
                      >
                        Add Skill
                      </button>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4">
                      List technical skills, soft skills, and tools you're proficient in.
                    </p>
                    
                    {resumeData.skills.map((skill, index) => (
                      <div key={index} className="flex items-center space-x-2 mb-2">
                        <input
                          type="text"
                          value={skill}
                          onChange={(e) => handleSkillChange(index, e.target.value)}
                          className="input"
                          placeholder="JavaScript"
                        />
                        <button 
                          onClick={() => removeSkill(index)}
                          className="text-gray-400 hover:text-error"
                          title="Remove skill"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                    
                    <div className="flex justify-end">
                      <button className="btn btn-primary">
                        Extract Skills from Experience
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Right Sidebar - Preview and Settings */}
          <div className="lg:col-span-1">
            {/* Template Selection */}
            <div className="card mb-6">
              <h3 className="card-title">Template</h3>
              <div className="grid grid-cols-3 gap-2 mt-4">
                <button 
                  className={`p-2 border rounded-md ${selectedTemplate === 'modern' ? 'border-primary bg-primary/5' : 'border-gray-200'}`}
                  onClick={() => setSelectedTemplate('modern')}
                >
                  <div className="bg-gray-100 aspect-[8.5/11] rounded-sm mb-2"></div>
                  <span className="text-sm">Modern</span>
                </button>
                <button 
                  className={`p-2 border rounded-md ${selectedTemplate === 'classic' ? 'border-primary bg-primary/5' : 'border-gray-200'}`}
                  onClick={() => setSelectedTemplate('classic')}
                >
                  <div className="bg-gray-100 aspect-[8.5/11] rounded-sm mb-2"></div>
                  <span className="text-sm">Classic</span>
                </button>
                <button 
                  className={`p-2 border rounded-md ${selectedTemplate === 'creative' ? 'border-primary bg-primary/5' : 'border-gray-200'}`}
                  onClick={() => setSelectedTemplate('creative')}
                >
                  <div className="bg-gray-100 aspect-[8.5/11] rounded-sm mb-2"></div>
                  <span className="text-sm">Creative</span>
                </button>
              </div>
            </div>
            
            {/* Resume Preview */}
            <div className="card mb-6 p-4 flex flex-col items-center">
              <h3 className="card-title mb-4 text-center">Preview</h3>
              <div className="w-full max-w-xs bg-white shadow-md border rounded-md aspect-[8.5/11] mb-4">
                {/* This would be the actual resume preview in a real application */}
                <div className="p-4 text-xs">
                  {resumeData.personalInfo.name && (
                    <div className="text-center mb-2">
                      <div className="font-bold">{resumeData.personalInfo.name}</div>
                      <div className="text-gray-600">{resumeData.personalInfo.email}</div>
                    </div>
                  )}
                  
                  {/* Simple preview of the content */}
                  {resumeData.summary && (
                    <div className="border-t border-gray-200 pt-2 mt-2">
                      <div className="font-semibold text-[10px]">SUMMARY</div>
                      <div className="text-[8px] line-clamp-2">{resumeData.summary}</div>
                    </div>
                  )}
                  
                  {resumeData.experience.some(e => e.company || e.position) && (
                    <div className="border-t border-gray-200 pt-2 mt-2">
                      <div className="font-semibold text-[10px]">EXPERIENCE</div>
                      {resumeData.experience.map((exp, i) => (
                        <div key={i} className="text-[8px] mb-1">
                          {exp.position && exp.company ? `${exp.position} at ${exp.company}` : exp.position || exp.company}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {resumeData.education.some(e => e.institution || e.degree) && (
                    <div className="border-t border-gray-200 pt-2 mt-2">
                      <div className="font-semibold text-[10px]">EDUCATION</div>
                      {resumeData.education.map((edu, i) => (
                        <div key={i} className="text-[8px] mb-1">
                          {edu.degree && edu.institution ? `${edu.degree} in ${edu.field}, ${edu.institution}` : edu.institution || edu.degree}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              <button 
                onClick={generateResume}
                className="btn btn-primary w-full"
              >
                Generate Resume
              </button>
            </div>
            
            {/* AI Assistant */}
            <div className="card">
              <h3 className="card-title">AI Resume Assistant</h3>
              <p className="text-sm text-gray-600 mt-2 mb-4">
                Get suggestions to improve your resume and tailor it for specific job applications.
              </p>
              
              <div className="space-y-3">
                <button className="btn btn-outline w-full justify-start">
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  Improve My Resume
                </button>
                
                <button className="btn btn-outline w-full justify-start">
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z" />
                  </svg>
                  Tailor for Job Description
                </button>
                
                <button className="btn btn-outline w-full justify-start">
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                  Keyword Optimization
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilderPage; 