const text = {
  directoryForm: {
    name: {
      label: 'Name',
      placeholder: 'Ai tool/software name'
    },
    type: {
      label: 'Pricing'
    },
    category: {
      label: 'Primary Use Cases'
    },
    website: {
      label: 'Website',
      placeholder: 'Link to landing or pricing page'
    },
    summary: {
      label: 'Summary Description',
      placeholder: 'This is shown to users browsing our directory'
    },
    extraInformation: {
      label: 'Extra Information',
      placeholder: 'This information is not shown publicly, but is used to provide more information to our chatbot about your AI tool'
    },
    images: {
      label: 'Images',
      fileUploadLabel: 'Add images to your directory listing',
      fileUploadButtonText: 'Browse'
    },
    videos: {
      label: 'Videos',
      fileUploadLabel: 'Add videos to your directory listing',
      fileUploadButtonText: 'Browse'
    },
    documents: {
      label: 'Documents',
      fileUploadLabel: 'These documents are not shown publicly, but are used to provide more information to our chatbot about your AI tool',
      fileUploadButtonText: 'Browse'
    }
  }
}

const toastText = {
  success: {
    linkCopied: 'Copied to clipboard',
    recordRemoved: 'Directory listing removed',
    directoryApproved: 'Your directory listing has been approved',
    directoryDelete: 'Your directory listing has been removed',
    directoryCreated: 'Your directory listing has been created',
    directoryUpdated: 'Your directory listing has been updated',
    reviewThanks: 'Your review has been posted',
    reviewUpdated: 'Your review has been updated',
    reviewDeleted: 'Your review has been removed',
    removedFromSaveList: 'Removed from Saved list',
    addToSaveList: 'Added to Saved list'
  },
  error: {
    loginFirst: 'Log in or create an account to use our chatbot',
    recordNotDeleted: 'Error removing directory listing',
    directoryNotApproved: 'Your directory listing has not yet been approved',
    directoryNotDeleted: 'Error removing directory listing',
    dircetoryCannotDelete: 'This directory listing cannot be removed',
    reviewNotAdded: 'Error posting review',
    reviewNotUpdated: 'Error updating review',
    reviewNotDeleted: 'Error removing review',
    alreadyHaveAReview: 'You can only post one review per AI tool',
    directoryNotSaved: 'Error saving changes to directory listing',
    savingWithoutLogin: 'Log in or create an account to save AI tools'
  }
}


export { text, toastText };
