{
    options.map((option, index) => <>
        {
            language === "both" ? <>
                
                <Grid item xs={10}>
                <CKEditor editor={ClassicEditor} data={text} 
                onChange={(event, editor) => { const data = editor.getData()
                setText(data)
                }}
                config={{
                headers: { 'Content-Type': 'application/json'},
                placeholder:'option'+'  '+ (index+1)+'  '+'english',
                ckfinder: {
                uploadUrl: '/uploads',
                withCredentials: true,
                headers: {
                 'X-CSRF-TOKEN': 'CSFR-Token',
                  Authorization: 'Bearer <JSON Web Token>'
        },
},
}}/></Grid>
                <Grid item xs={10}>
                <CKEditor editor={ClassicEditor} data={text} 
                onChange={(event, editor) => { const data = editor.getData()
                setText(data)
                }}
                config={{
                headers: { 'Content-Type': 'application/json'},
                placeholder: 'option'+'  '+ (index+1) +'  '+'Hindi' ,
                ckfinder: {
                uploadUrl: '/uploads',
                withCredentials: true,
                headers: {
                 'X-CSRF-TOKEN': 'CSFR-Token',
                  Authorization: 'Bearer <JSON Web Token>'
        }, },
    }}/>
                </Grid>
            </> :
                 language === "hindi" ? <>
                         <>
                        <Grid item xs={10}>
                        <CKEditor editor={ClassicEditor} data={text} 
                onChange={(event, editor) => { const data = editor.getData()
                setText(data)
                }}
                config={{
                headers: { 'Content-Type': 'application/json'},
                placeholder: 'option'+'  '+ (index+1) +'  '+'Hindi' ,
                ckfinder: {
                uploadUrl: '/uploads',
                withCredentials: true,
                headers: {
                 'X-CSRF-TOKEN': 'CSFR-Token',
                  Authorization: 'Bearer <JSON Web Token>'
        }, },
    }}/></Grid> </>
                     </> :
                <>
                <Grid item xs={10}>
                <CKEditor editor={ClassicEditor} data={text} 
                onChange={(event, editor) => { const data = editor.getData()
                setText(data)
                }}
                config={{
                   placeholder:'option'+'  '+ (index+1)+'  '+'english',
                   headers: { 'Content-Type': 'application/json'},
                   ckfinder: {
                   uploadUrl: '/uploads',
                   withCredentials: true,
                   headers: {
                     'X-CSRF-TOKEN': 'CSFR-Token',
                      Authorization: 'Bearer <JSON Web Token>'
                    },},
                }}/>
                    </Grid>
                </>
        }
    </>)
}
