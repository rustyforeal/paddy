# paddy

A simple web app to report on the below:

A> MIME type of the multipart/form-data file that is being uploaded.

B> SHA256 hash of the file that is being uploaded.

C> SHA256 hash check against VirusTotal - using Public API key.


Note - file is not stored on disk at any point of time and is present in buffer.

Need to add the below:

A> Clean the buffer after all the reporting has been completed.

B> Additional actions like blocking specific MIME types need to be added - this can be achieved easily as the MIME type is already being reported.

C> Algorithm for a unique id for every file that is being uploaded.

E> Better reporting capability - probably usage of MongoDB

This code has been written and conceptualised by rusty.

Contact me at rustyforeal@gmail.com

