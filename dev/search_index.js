var documenterSearchIndex = {"docs":
[{"location":"#ADIOS2.jl","page":"ADIOS2.jl","title":"ADIOS2.jl","text":"","category":"section"},{"location":"","page":"ADIOS2.jl","title":"ADIOS2.jl","text":"ADIOS2.jl is a Julia interface to the ADIOS2, the Adaptable Input Output System version 2.","category":"page"},{"location":"#Types","page":"ADIOS2.jl","title":"Types","text":"","category":"section"},{"location":"","page":"ADIOS2.jl","title":"ADIOS2.jl","text":"Error\nMode\nShapeId","category":"page"},{"location":"#ADIOS2.Error","page":"ADIOS2.jl","title":"ADIOS2.Error","text":"@enum Error begin\n    error_none\n    error_invalid_argument\n    error_system_error\n    error_runtime_error\n    error_exception\nend\n\nError return types for all ADIOS2 functions\n\nBased on the library C++ standardized exceptions. Each error will issue a more detailed description in the standard error output, stderr\n\n\n\n\n\n","category":"type"},{"location":"#ADIOS2.Mode","page":"ADIOS2.jl","title":"ADIOS2.Mode","text":"@enum Mode begin\n    mode_undefined\n    mode_write\n    mode_read\n    mode_append\n    mode_deferred\n    mode_sync\nend\n\nMode specifies for various functions. write, read, append are used for file operations, deferred, sync are used for get and put operations.\n\n\n\n\n\n","category":"type"},{"location":"#ADIOS2.ShapeId","page":"ADIOS2.jl","title":"ADIOS2.ShapeId","text":"@enum ShapeId begin\n    shapeid_unknown\n    shapeid_global_value\n    shapeid_global_array\n    shapeid_joined_array\n    shapeid_local_value\n    shapeid_local_array\nend\n\n\n\n\n\n","category":"type"},{"location":"#Adios-functions","page":"ADIOS2.jl","title":"Adios functions","text":"","category":"section"},{"location":"","page":"ADIOS2.jl","title":"ADIOS2.jl","text":"Adios\nadios_init_mpi\nadios_init_serial\ndeclare_io\nadios_finalize","category":"page"},{"location":"#ADIOS2.Adios","page":"ADIOS2.jl","title":"ADIOS2.Adios","text":"mutable struct Adios\n\nHolds a C pointer adios2_adios *.\n\nThis value is finalized automatically. It can also be explicitly finalized by calling finalize(adios).\n\n\n\n\n\n","category":"type"},{"location":"#ADIOS2.adios_init_mpi","page":"ADIOS2.jl","title":"ADIOS2.adios_init_mpi","text":"adios = adios_init_mpi(MPI.Comm)\nadios::Union{Adios,Nothing}\n\nStarting point for MPI apps. Creates an ADIOS handler. MPI collective and it calls MPI_Comm_dup.\n\n\n\n\n\n","category":"function"},{"location":"#ADIOS2.adios_init_serial","page":"ADIOS2.jl","title":"ADIOS2.adios_init_serial","text":"adios = adios_init_serial()\nadios::Union{Adios,Nothing}\n\nInitialize an Adios struct in a serial, non-MPI application. Doesn’t require a runtime config file.\n\nSee also the ADIOS2 documentation.\n\n\n\n\n\n","category":"function"},{"location":"#ADIOS2.declare_io","page":"ADIOS2.jl","title":"ADIOS2.declare_io","text":"io = declare_io(adios::Adios, name::AbstractString)\nio::Union{AIO,Nothing}\n\nDeclare a new IO handler.\n\nSee also the ADIOS2 documentation.\n\n\n\n\n\n","category":"function"},{"location":"#ADIOS2.adios_finalize","page":"ADIOS2.jl","title":"ADIOS2.adios_finalize","text":"err = adios_finalize(adios::Adios)\nerr::Error\n\nFinalize the ADIOS context adios. It is usually not necessary to call this function.\n\nInstead of calling this function, one can also call the finalizer via finalize(adios). This finalizer is also called automatically when the Adios object is garbage collected.\n\nSee also the ADIOS2 documentation\n\n\n\n\n\n","category":"function"},{"location":"#IO-functions","page":"ADIOS2.jl","title":"IO functions","text":"","category":"section"},{"location":"","page":"ADIOS2.jl","title":"ADIOS2.jl","text":"AIO\ndefine_variable\ninquire_variable\ninquire_all_variables\nopen","category":"page"},{"location":"#ADIOS2.AIO","page":"ADIOS2.jl","title":"ADIOS2.AIO","text":"struct AIO\n\nHolds a C pointer adios2_io *.\n\n\n\n\n\n","category":"type"},{"location":"#ADIOS2.define_variable","page":"ADIOS2.jl","title":"ADIOS2.define_variable","text":"variable = define_variable(io::AIO, name::AbstractString, type::Type,\n                     shape::Union{Nothing,CartesianIndex}=nothing,\n                     start::Union{Nothing,CartesianIndex}=nothing,\n                     count::Union{Nothing,CartesianIndex}=nothing,\n                     constant_dims::Bool=false)\nvariable::Union{Nothing,Variable}\n\nDefine a variable within io.\n\nArguments\n\nio: handler that owns the variable\nname: unique variable identifier\ntype: primitive type\nndims: number of dimensions\nshape: global dimension\nstart: local offset\ncount: local dimension\nconstant_dims: true: shape, start, count won't change; false: shape, start, count will change after definition\n\n\n\n\n\n","category":"function"},{"location":"#ADIOS2.inquire_variable","page":"ADIOS2.jl","title":"ADIOS2.inquire_variable","text":"variable = inquire_variable(io::AIO, name::AbstractString)\nvariable::Union{Nothing,Variable}\n\nRetrieve a variable handler within current io handler.\n\nArguments\n\nio: handler to variable io owner\nname: unique variable identifier within io handler\n\n\n\n\n\n","category":"function"},{"location":"#ADIOS2.inquire_all_variables","page":"ADIOS2.jl","title":"ADIOS2.inquire_all_variables","text":"variables = inquire_all_variables(io::AIO)\nvariables::Union{Nothing,Vector{Variable}}\n\nReturns an array of variable handlers for all variable present in the io group.\n\nArguments\n\nio: handler to variables io owner\n\n\n\n\n\n","category":"function"},{"location":"#Base.open","page":"ADIOS2.jl","title":"Base.open","text":"engine = open(io::AIO, name::AbstractString, mode::Mode)\nengine::Union{Nothing,Engine}\n\nOpen an Engine to start heavy-weight input/output operations.\n\nIn MPI version reuses the communicator from adios_init_mpi. MPI Collective function as it calls MPI_Comm_dup.\n\nArguments\n\nio: engine owner\nname: unique engine identifier\nmode: mode_write, mode_read, `mode_appendq (not yet supported)\n\n\n\n\n\n","category":"function"},{"location":"#Variable-functions","page":"ADIOS2.jl","title":"Variable functions","text":"","category":"section"},{"location":"","page":"ADIOS2.jl","title":"ADIOS2.jl","text":"Variable\nname\ntype\nshapeid\nndims\nshape\nstart\ncount\nsteps_start\nsteps\nselection_size\nminimum\nmaximum","category":"page"},{"location":"#ADIOS2.Variable","page":"ADIOS2.jl","title":"ADIOS2.Variable","text":"struct Variable\n\nHolds a C pointer adios2_variable *.\n\n\n\n\n\n","category":"type"},{"location":"#ADIOS2.name","page":"ADIOS2.jl","title":"ADIOS2.name","text":"name = name(variable::Variable)\nname::Union{Nothing,String}\n\nRetrieve variable name.\n\n\n\n\n\n","category":"function"},{"location":"#ADIOS2.type","page":"ADIOS2.jl","title":"ADIOS2.type","text":"type = type(variable::Variable)\ntype::Union{Nothing,Type}\n\nRetrieve variable type.\n\n\n\n\n\n","category":"function"},{"location":"#ADIOS2.shapeid","page":"ADIOS2.jl","title":"ADIOS2.shapeid","text":"shapeid = shapeid(variable::Variable)\nshapeid::Union{Nothing,ShapeId}\n\nRetrieve variable shapeid.\n\n\n\n\n\n","category":"function"},{"location":"#Base.ndims","page":"ADIOS2.jl","title":"Base.ndims","text":"var_ndims = ndims(variable::Variable)\nvar_ndims::Union{Nothing,Int}\n\nRetrieve current variable number of dimensions.\n\n\n\n\n\n","category":"function"},{"location":"#ADIOS2.shape","page":"ADIOS2.jl","title":"ADIOS2.shape","text":"var_shape = shape(variable::Variable)\nvar_shape::Union{Nothing,CartesianIndex}\n\nRetrieve current variable shape.\n\n\n\n\n\n","category":"function"},{"location":"#ADIOS2.start","page":"ADIOS2.jl","title":"ADIOS2.start","text":"var_start = start(variable::Variable)\nvar_start::Union{Nothing,CartesianIndex}\n\nRetrieve current variable start.\n\n\n\n\n\n","category":"function"},{"location":"#Base.count","page":"ADIOS2.jl","title":"Base.count","text":"var_count = count(variable::Variable)\nvar_count::Union{Nothing,CartesianIndex}\n\nRetrieve current variable count.\n\n\n\n\n\n","category":"function"},{"location":"#ADIOS2.steps_start","page":"ADIOS2.jl","title":"ADIOS2.steps_start","text":"var_steps_start = steps_start(variable::Variable)\nvar_steps_start::Union{Nothing,Int}\n\nRead API, get available steps start from available steps count (e.g. in a file for a variable).\n\nThis returns the absolute first available step, don't use with adios2_set_step_selection as inputs are relative, use 0 instead.\n\n\n\n\n\n","category":"function"},{"location":"#ADIOS2.steps","page":"ADIOS2.jl","title":"ADIOS2.steps","text":"var_steps = steps(variable::Variable)\nvar_steps::Union{Nothing,Int}\n\nRead API, get available steps count from available steps count (e.g. in a file for a variable). Not necessarily contiguous.\n\n\n\n\n\n","category":"function"},{"location":"#ADIOS2.selection_size","page":"ADIOS2.jl","title":"ADIOS2.selection_size","text":"var_selection_size = selection_size(variable::Variable)\nvar_selection_size::Union{Nothing,Int}\n\nReturn the minimum required allocation (in number of elements of a certain type, not bytes) for the current selection.\n\n\n\n\n\n","category":"function"},{"location":"#Base.minimum","page":"ADIOS2.jl","title":"Base.minimum","text":"var_min = minimum(variable::Variable)\nvar_min::Union{Nothing,T}\n\nRead mode only: return the absolute minimum for variable.\n\n\n\n\n\n","category":"function"},{"location":"#Base.maximum","page":"ADIOS2.jl","title":"Base.maximum","text":"var_max = maximum(variable::Variable)\nvar_max::Union{Nothing,T}\n\nRead mode only: return the absolute maximum for variable.\n\n\n\n\n\n","category":"function"},{"location":"#Engine-functions","page":"ADIOS2.jl","title":"Engine functions","text":"","category":"section"},{"location":"","page":"ADIOS2.jl","title":"ADIOS2.jl","text":"Engine","category":"page"},{"location":"#ADIOS2.Engine","page":"ADIOS2.jl","title":"ADIOS2.Engine","text":"struct Engine\n\nHolds a C pointer adios2_engine *.\n\n\n\n\n\n","category":"type"}]
}
