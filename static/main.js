const postsBox = document.getElementById('posts-box')
console.log(postsBox)
const spinnerBox = document.getElementById('spinner-box')
const loadBtn = document.getElementById('load-btn')
const loadBox = document.getElementById('loading-box')

let visible = 3;
const handleGetData = () => {
    $.ajax({
        type: 'GET',
        url: `/posts-json/${visible}`,
        success: function(response){
            // console.log(response.max)
            max_size = response.max
            const data = response.data
            spinnerBox.classList.remove('not-visible')
            setTimeout(()=>{
                spinnerBox.classList.add('not-visible')
                data.map(post =>{
                    console.log(post.id)
                    postsBox.innerHTML+=`<div class="card  my-3">
                    <div class="card-header"><h3>${post.name}</h3></div>
                    <div class="card-body">${post.body}</div>
                    <div class="card-footer text-end"><b>Post created at: </b>${post.created}</div>
                    </div>`
                })
            },500)
            
            if(max_size){
                console.log('done')
                loadBox.innerHTML = "<div class='alert alert-danger' role='alert'>No more posts to load</div>"
            }
        },
        error: function(error){
            console.log(error)
        }
    })
}



handleGetData()
loadBtn.addEventListener('click',()=>{
    visible = visible + 3;
    handleGetData()
})