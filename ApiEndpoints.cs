/// <summary>
/// SGA - Sistema de Gestión de Aeropuerto
/// Endpoints de la API para uso del frontend ASP.NET
///
/// Uso:
///   string url = ApiEndpoints.Pasajero.GetAll();
///   string url = ApiEndpoints.Pasajero.GetById(5);
///   string url = ApiEndpoints.Vuelo.GetByFecha("2026-04-13");
///   string url = ApiEndpoints.Asiento.GetByAvion(3);
///
///   Con HttpClient:
///   var response = await _httpClient.GetAsync(ApiEndpoints.Pasajero.GetAll());
/// </summary>
public static class ApiEndpoints
{
    public static string BaseUrl { get; set; } = "http://localhost:3000";

    // ─────────────────────────────────────────────
    // Helper privado para construir la URL completa
    // ─────────────────────────────────────────────
    private static string Url(string path) => $"{BaseUrl}{path}";

    // ─────────────────────────────────────────────
    // General
    // ─────────────────────────────────────────────
    public static class General
    {
        public static string Health()        => Url("/health");
        public static string DbTest()        => Url("/db/test");
        public static string SgaInfo()       => Url("/sga");
        public static string SgaTablas()     => Url("/sga/tablas");
        public static string Inicializar()   => Url("/sga/inicializar");
        public static string EliminarTodo()  => Url("/sga/eliminar-todo");
    }

    // ─────────────────────────────────────────────
    // Catálogos
    // ─────────────────────────────────────────────
    public static class Pais
    {
        private const string Base = "/sga/pais";
        public static string GetAll()                  => Url(Base);
        public static string Count()                   => Url($"{Base}/count");
        public static string GetById(int id)           => Url($"{Base}/{id}");
        public static string Create()                  => Url(Base);
        public static string Update(int id)            => Url($"{Base}/{id}");
        public static string Delete(int id)            => Url($"{Base}/{id}");
        public static string GetAllIncludingDeleted()  => Url($"{Base}/all-including-deleted");
        public static string GetDeleted()              => Url($"{Base}/deleted");
        public static string CountDeleted()            => Url($"{Base}/deleted/count");
        public static string Restore(int id)           => Url($"{Base}/{id}/restore");
        public static string ForceDelete(int id)       => Url($"{Base}/{id}/force");
    }

    public static class Ciudad
    {
        private const string Base = "/sga/ciudad";
        public static string GetAll()                  => Url(Base);
        public static string Count()                   => Url($"{Base}/count");
        public static string GetById(int id)           => Url($"{Base}/{id}");
        public static string Create()                  => Url(Base);
        public static string Update(int id)            => Url($"{Base}/{id}");
        public static string Delete(int id)            => Url($"{Base}/{id}");
        public static string GetAllIncludingDeleted()  => Url($"{Base}/all-including-deleted");
        public static string GetDeleted()              => Url($"{Base}/deleted");
        public static string CountDeleted()            => Url($"{Base}/deleted/count");
        public static string Restore(int id)           => Url($"{Base}/{id}/restore");
        public static string ForceDelete(int id)       => Url($"{Base}/{id}/force");
    }

    public static class EstadoAeropuerto
    {
        private const string Base = "/sga/estado-aeropuerto";
        public static string GetAll()                  => Url(Base);
        public static string Count()                   => Url($"{Base}/count");
        public static string GetById(int id)           => Url($"{Base}/{id}");
        public static string Create()                  => Url(Base);
        public static string Update(int id)            => Url($"{Base}/{id}");
        public static string Delete(int id)            => Url($"{Base}/{id}");
        public static string GetAllIncludingDeleted()  => Url($"{Base}/all-including-deleted");
        public static string GetDeleted()              => Url($"{Base}/deleted");
        public static string CountDeleted()            => Url($"{Base}/deleted/count");
        public static string Restore(int id)           => Url($"{Base}/{id}/restore");
        public static string ForceDelete(int id)       => Url($"{Base}/{id}/force");
    }

    public static class EstadoAerolinea
    {
        private const string Base = "/sga/estado-aerolinea";
        public static string GetAll()                  => Url(Base);
        public static string Count()                   => Url($"{Base}/count");
        public static string GetById(int id)           => Url($"{Base}/{id}");
        public static string Create()                  => Url(Base);
        public static string Update(int id)            => Url($"{Base}/{id}");
        public static string Delete(int id)            => Url($"{Base}/{id}");
        public static string GetAllIncludingDeleted()  => Url($"{Base}/all-including-deleted");
        public static string GetDeleted()              => Url($"{Base}/deleted");
        public static string CountDeleted()            => Url($"{Base}/deleted/count");
        public static string Restore(int id)           => Url($"{Base}/{id}/restore");
        public static string ForceDelete(int id)       => Url($"{Base}/{id}/force");
    }

    public static class EstadoAvion
    {
        private const string Base = "/sga/estado-avion";
        public static string GetAll()                  => Url(Base);
        public static string Count()                   => Url($"{Base}/count");
        public static string GetById(int id)           => Url($"{Base}/{id}");
        public static string Create()                  => Url(Base);
        public static string Update(int id)            => Url($"{Base}/{id}");
        public static string Delete(int id)            => Url($"{Base}/{id}");
        public static string GetAllIncludingDeleted()  => Url($"{Base}/all-including-deleted");
        public static string GetDeleted()              => Url($"{Base}/deleted");
        public static string CountDeleted()            => Url($"{Base}/deleted/count");
        public static string Restore(int id)           => Url($"{Base}/{id}/restore");
        public static string ForceDelete(int id)       => Url($"{Base}/{id}/force");
    }

    public static class EstadoVuelo
    {
        private const string Base = "/sga/estado-vuelo";
        public static string GetAll()                  => Url(Base);
        public static string Count()                   => Url($"{Base}/count");
        public static string GetById(int id)           => Url($"{Base}/{id}");
        public static string Create()                  => Url(Base);
        public static string Update(int id)            => Url($"{Base}/{id}");
        public static string Delete(int id)            => Url($"{Base}/{id}");
        public static string GetAllIncludingDeleted()  => Url($"{Base}/all-including-deleted");
        public static string GetDeleted()              => Url($"{Base}/deleted");
        public static string CountDeleted()            => Url($"{Base}/deleted/count");
        public static string Restore(int id)           => Url($"{Base}/{id}/restore");
        public static string ForceDelete(int id)       => Url($"{Base}/{id}/force");
    }

    public static class TipoVuelo
    {
        private const string Base = "/sga/tipo-vuelo";
        public static string GetAll()                  => Url(Base);
        public static string Count()                   => Url($"{Base}/count");
        public static string GetById(int id)           => Url($"{Base}/{id}");
        public static string Create()                  => Url(Base);
        public static string Update(int id)            => Url($"{Base}/{id}");
        public static string Delete(int id)            => Url($"{Base}/{id}");
        public static string GetAllIncludingDeleted()  => Url($"{Base}/all-including-deleted");
        public static string GetDeleted()              => Url($"{Base}/deleted");
        public static string CountDeleted()            => Url($"{Base}/deleted/count");
        public static string Restore(int id)           => Url($"{Base}/{id}/restore");
        public static string ForceDelete(int id)       => Url($"{Base}/{id}/force");
    }

    public static class Dia
    {
        private const string Base = "/sga/dia";
        public static string GetAll()                  => Url(Base);
        public static string Count()                   => Url($"{Base}/count");
        public static string GetById(int id)           => Url($"{Base}/{id}");
        public static string Create()                  => Url(Base);
        public static string Update(int id)            => Url($"{Base}/{id}");
        public static string Delete(int id)            => Url($"{Base}/{id}");
        public static string GetAllIncludingDeleted()  => Url($"{Base}/all-including-deleted");
        public static string GetDeleted()              => Url($"{Base}/deleted");
        public static string CountDeleted()            => Url($"{Base}/deleted/count");
        public static string Restore(int id)           => Url($"{Base}/{id}/restore");
        public static string ForceDelete(int id)       => Url($"{Base}/{id}/force");
    }

    public static class ClaseBoleto
    {
        private const string Base = "/sga/clase-boleto";
        public static string GetAll()                  => Url(Base);
        public static string Count()                   => Url($"{Base}/count");
        public static string GetById(int id)           => Url($"{Base}/{id}");
        public static string Create()                  => Url(Base);
        public static string Update(int id)            => Url($"{Base}/{id}");
        public static string Delete(int id)            => Url($"{Base}/{id}");
        public static string GetAllIncludingDeleted()  => Url($"{Base}/all-including-deleted");
        public static string GetDeleted()              => Url($"{Base}/deleted");
        public static string CountDeleted()            => Url($"{Base}/deleted/count");
        public static string Restore(int id)           => Url($"{Base}/{id}/restore");
        public static string ForceDelete(int id)       => Url($"{Base}/{id}/force");
    }

    public static class TipoEquipaje
    {
        private const string Base = "/sga/tipo-equipaje";
        public static string GetAll()                  => Url(Base);
        public static string Count()                   => Url($"{Base}/count");
        public static string GetById(int id)           => Url($"{Base}/{id}");
        public static string Create()                  => Url(Base);
        public static string Update(int id)            => Url($"{Base}/{id}");
        public static string Delete(int id)            => Url($"{Base}/{id}");
        public static string GetAllIncludingDeleted()  => Url($"{Base}/all-including-deleted");
        public static string GetDeleted()              => Url($"{Base}/deleted");
        public static string CountDeleted()            => Url($"{Base}/deleted/count");
        public static string Restore(int id)           => Url($"{Base}/{id}/restore");
        public static string ForceDelete(int id)       => Url($"{Base}/{id}/force");
    }

    public static class TipoUbicacion
    {
        private const string Base = "/sga/tipo-ubicacion";
        public static string GetAll()                  => Url(Base);
        public static string Count()                   => Url($"{Base}/count");
        public static string GetById(int id)           => Url($"{Base}/{id}");
        public static string Create()                  => Url(Base);
        public static string Update(int id)            => Url($"{Base}/{id}");
        public static string Delete(int id)            => Url($"{Base}/{id}");
        public static string GetAllIncludingDeleted()  => Url($"{Base}/all-including-deleted");
        public static string GetDeleted()              => Url($"{Base}/deleted");
        public static string CountDeleted()            => Url($"{Base}/deleted/count");
        public static string Restore(int id)           => Url($"{Base}/{id}/restore");
        public static string ForceDelete(int id)       => Url($"{Base}/{id}/force");
    }

    public static class EstadoObjeto
    {
        private const string Base = "/sga/estado-objeto";
        public static string GetAll()                  => Url(Base);
        public static string Count()                   => Url($"{Base}/count");
        public static string GetById(int id)           => Url($"{Base}/{id}");
        public static string Create()                  => Url(Base);
        public static string Update(int id)            => Url($"{Base}/{id}");
        public static string Delete(int id)            => Url($"{Base}/{id}");
        public static string GetAllIncludingDeleted()  => Url($"{Base}/all-including-deleted");
        public static string GetDeleted()              => Url($"{Base}/deleted");
        public static string CountDeleted()            => Url($"{Base}/deleted/count");
        public static string Restore(int id)           => Url($"{Base}/{id}/restore");
        public static string ForceDelete(int id)       => Url($"{Base}/{id}/force");
    }

    public static class Motivo
    {
        private const string Base = "/sga/motivo";
        public static string GetAll()                  => Url(Base);
        public static string Count()                   => Url($"{Base}/count");
        public static string GetById(int id)           => Url($"{Base}/{id}");
        public static string Create()                  => Url(Base);
        public static string Update(int id)            => Url($"{Base}/{id}");
        public static string Delete(int id)            => Url($"{Base}/{id}");
        public static string GetAllIncludingDeleted()  => Url($"{Base}/all-including-deleted");
        public static string GetDeleted()              => Url($"{Base}/deleted");
        public static string CountDeleted()            => Url($"{Base}/deleted/count");
        public static string Restore(int id)           => Url($"{Base}/{id}/restore");
        public static string ForceDelete(int id)       => Url($"{Base}/{id}/force");
    }

    public static class Puesto
    {
        private const string Base = "/sga/puesto";
        public static string GetAll()                  => Url(Base);
        public static string Count()                   => Url($"{Base}/count");
        public static string GetById(int id)           => Url($"{Base}/{id}");
        public static string Create()                  => Url(Base);
        public static string Update(int id)            => Url($"{Base}/{id}");
        public static string Delete(int id)            => Url($"{Base}/{id}");
        public static string GetAllIncludingDeleted()  => Url($"{Base}/all-including-deleted");
        public static string GetDeleted()              => Url($"{Base}/deleted");
        public static string CountDeleted()            => Url($"{Base}/deleted/count");
        public static string Restore(int id)           => Url($"{Base}/{id}/restore");
        public static string ForceDelete(int id)       => Url($"{Base}/{id}/force");
    }

    public static class Departamento
    {
        private const string Base = "/sga/departamento";
        public static string GetAll()                  => Url(Base);
        public static string Count()                   => Url($"{Base}/count");
        public static string GetById(int id)           => Url($"{Base}/{id}");
        public static string Create()                  => Url(Base);
        public static string Update(int id)            => Url($"{Base}/{id}");
        public static string Delete(int id)            => Url($"{Base}/{id}");
        public static string GetAllIncludingDeleted()  => Url($"{Base}/all-including-deleted");
        public static string GetDeleted()              => Url($"{Base}/deleted");
        public static string CountDeleted()            => Url($"{Base}/deleted/count");
        public static string Restore(int id)           => Url($"{Base}/{id}/restore");
        public static string ForceDelete(int id)       => Url($"{Base}/{id}/force");
    }

    public static class EstadoEmpleado
    {
        private const string Base = "/sga/estado-empleado";
        public static string GetAll()                  => Url(Base);
        public static string Count()                   => Url($"{Base}/count");
        public static string GetById(int id)           => Url($"{Base}/{id}");
        public static string Create()                  => Url(Base);
        public static string Update(int id)            => Url($"{Base}/{id}");
        public static string Delete(int id)            => Url($"{Base}/{id}");
        public static string GetAllIncludingDeleted()  => Url($"{Base}/all-including-deleted");
        public static string GetDeleted()              => Url($"{Base}/deleted");
        public static string CountDeleted()            => Url($"{Base}/deleted/count");
        public static string Restore(int id)           => Url($"{Base}/{id}/restore");
        public static string ForceDelete(int id)       => Url($"{Base}/{id}/force");
    }

    public static class Terminal
    {
        private const string Base = "/sga/terminal";
        public static string GetAll()                  => Url(Base);
        public static string Count()                   => Url($"{Base}/count");
        public static string GetById(int id)           => Url($"{Base}/{id}");
        public static string Create()                  => Url(Base);
        public static string Update(int id)            => Url($"{Base}/{id}");
        public static string Delete(int id)            => Url($"{Base}/{id}");
        public static string GetAllIncludingDeleted()  => Url($"{Base}/all-including-deleted");
        public static string GetDeleted()              => Url($"{Base}/deleted");
        public static string CountDeleted()            => Url($"{Base}/deleted/count");
        public static string Restore(int id)           => Url($"{Base}/{id}/restore");
        public static string ForceDelete(int id)       => Url($"{Base}/{id}/force");
    }

    public static class TipoEvento
    {
        private const string Base = "/sga/tipo-evento";
        public static string GetAll()                  => Url(Base);
        public static string Count()                   => Url($"{Base}/count");
        public static string GetById(int id)           => Url($"{Base}/{id}");
        public static string Create()                  => Url(Base);
        public static string Update(int id)            => Url($"{Base}/{id}");
        public static string Delete(int id)            => Url($"{Base}/{id}");
        public static string GetAllIncludingDeleted()  => Url($"{Base}/all-including-deleted");
        public static string GetDeleted()              => Url($"{Base}/deleted");
        public static string CountDeleted()            => Url($"{Base}/deleted/count");
        public static string Restore(int id)           => Url($"{Base}/{id}/restore");
        public static string ForceDelete(int id)       => Url($"{Base}/{id}/force");
    }

    public static class EstadoAsignacion
    {
        private const string Base = "/sga/estado-asignacion";
        public static string GetAll()                  => Url(Base);
        public static string Count()                   => Url($"{Base}/count");
        public static string GetById(int id)           => Url($"{Base}/{id}");
        public static string Create()                  => Url(Base);
        public static string Update(int id)            => Url($"{Base}/{id}");
        public static string Delete(int id)            => Url($"{Base}/{id}");
        public static string GetAllIncludingDeleted()  => Url($"{Base}/all-including-deleted");
        public static string GetDeleted()              => Url($"{Base}/deleted");
        public static string CountDeleted()            => Url($"{Base}/deleted/count");
        public static string Restore(int id)           => Url($"{Base}/{id}/restore");
        public static string ForceDelete(int id)       => Url($"{Base}/{id}/force");
    }

    public static class EstadoReserva
    {
        private const string Base = "/sga/estado-reserva";
        public static string GetAll()                  => Url(Base);
        public static string Count()                   => Url($"{Base}/count");
        public static string GetById(int id)           => Url($"{Base}/{id}");
        public static string Create()                  => Url(Base);
        public static string Update(int id)            => Url($"{Base}/{id}");
        public static string Delete(int id)            => Url($"{Base}/{id}");
        public static string GetAllIncludingDeleted()  => Url($"{Base}/all-including-deleted");
        public static string GetDeleted()              => Url($"{Base}/deleted");
        public static string CountDeleted()            => Url($"{Base}/deleted/count");
        public static string Restore(int id)           => Url($"{Base}/{id}/restore");
        public static string ForceDelete(int id)       => Url($"{Base}/{id}/force");
    }

    public static class Turno
    {
        private const string Base = "/sga/turno";
        public static string GetAll()                  => Url(Base);
        public static string Count()                   => Url($"{Base}/count");
        public static string GetById(int id)           => Url($"{Base}/{id}");
        public static string Create()                  => Url(Base);
        public static string Update(int id)            => Url($"{Base}/{id}");
        public static string Delete(int id)            => Url($"{Base}/{id}");
        public static string GetAllIncludingDeleted()  => Url($"{Base}/all-including-deleted");
        public static string GetDeleted()              => Url($"{Base}/deleted");
        public static string CountDeleted()            => Url($"{Base}/deleted/count");
        public static string Restore(int id)           => Url($"{Base}/{id}/restore");
        public static string ForceDelete(int id)       => Url($"{Base}/{id}/force");
    }

    public static class MetodoPago
    {
        private const string Base = "/sga/metodo-pago";
        public static string GetAll()                  => Url(Base);
        public static string Count()                   => Url($"{Base}/count");
        public static string GetById(int id)           => Url($"{Base}/{id}");
        public static string Create()                  => Url(Base);
        public static string Update(int id)            => Url($"{Base}/{id}");
        public static string Delete(int id)            => Url($"{Base}/{id}");
        public static string GetAllIncludingDeleted()  => Url($"{Base}/all-including-deleted");
        public static string GetDeleted()              => Url($"{Base}/deleted");
        public static string CountDeleted()            => Url($"{Base}/deleted/count");
        public static string Restore(int id)           => Url($"{Base}/{id}/restore");
        public static string ForceDelete(int id)       => Url($"{Base}/{id}/force");
    }

    public static class EstadoReembolso
    {
        private const string Base = "/sga/estado-reembolso";
        public static string GetAll()                  => Url(Base);
        public static string Count()                   => Url($"{Base}/count");
        public static string GetById(int id)           => Url($"{Base}/{id}");
        public static string Create()                  => Url(Base);
        public static string Update(int id)            => Url($"{Base}/{id}");
        public static string Delete(int id)            => Url($"{Base}/{id}");
        public static string GetAllIncludingDeleted()  => Url($"{Base}/all-including-deleted");
        public static string GetDeleted()              => Url($"{Base}/deleted");
        public static string CountDeleted()            => Url($"{Base}/deleted/count");
        public static string Restore(int id)           => Url($"{Base}/{id}/restore");
        public static string ForceDelete(int id)       => Url($"{Base}/{id}/force");
    }

    public static class EstadoAbordaje
    {
        private const string Base = "/sga/estado-abordaje";
        public static string GetAll()                  => Url(Base);
        public static string Count()                   => Url($"{Base}/count");
        public static string GetById(int id)           => Url($"{Base}/{id}");
        public static string Create()                  => Url(Base);
        public static string Update(int id)            => Url($"{Base}/{id}");
        public static string Delete(int id)            => Url($"{Base}/{id}");
        public static string GetAllIncludingDeleted()  => Url($"{Base}/all-including-deleted");
        public static string GetDeleted()              => Url($"{Base}/deleted");
        public static string CountDeleted()            => Url($"{Base}/deleted/count");
        public static string Restore(int id)           => Url($"{Base}/{id}/restore");
        public static string ForceDelete(int id)       => Url($"{Base}/{id}/force");
    }

    public static class EstadoCheckin
    {
        private const string Base = "/sga/estado-checkin";
        public static string GetAll()                  => Url(Base);
        public static string Count()                   => Url($"{Base}/count");
        public static string GetById(int id)           => Url($"{Base}/{id}");
        public static string Create()                  => Url(Base);
        public static string Update(int id)            => Url($"{Base}/{id}");
        public static string Delete(int id)            => Url($"{Base}/{id}");
        public static string GetAllIncludingDeleted()  => Url($"{Base}/all-including-deleted");
        public static string GetDeleted()              => Url($"{Base}/deleted");
        public static string CountDeleted()            => Url($"{Base}/deleted/count");
        public static string Restore(int id)           => Url($"{Base}/{id}/restore");
        public static string ForceDelete(int id)       => Url($"{Base}/{id}/force");
    }

    public static class EstadoAsiento
    {
        private const string Base = "/sga/estado-asiento";
        public static string GetAll()                  => Url(Base);
        public static string Count()                   => Url($"{Base}/count");
        public static string GetById(int id)           => Url($"{Base}/{id}");
        public static string Create()                  => Url(Base);
        public static string Update(int id)            => Url($"{Base}/{id}");
        public static string Delete(int id)            => Url($"{Base}/{id}");
        public static string GetAllIncludingDeleted()  => Url($"{Base}/all-including-deleted");
        public static string GetDeleted()              => Url($"{Base}/deleted");
        public static string CountDeleted()            => Url($"{Base}/deleted/count");
        public static string Restore(int id)           => Url($"{Base}/{id}/restore");
        public static string ForceDelete(int id)       => Url($"{Base}/{id}/force");
    }

    public static class Rol
    {
        private const string Base = "/sga/rol";
        public static string GetAll()                  => Url(Base);
        public static string Count()                   => Url($"{Base}/count");
        public static string GetById(int id)           => Url($"{Base}/{id}");
        public static string Create()                  => Url(Base);
        public static string Update(int id)            => Url($"{Base}/{id}");
        public static string Delete(int id)            => Url($"{Base}/{id}");
        public static string GetAllIncludingDeleted()  => Url($"{Base}/all-including-deleted");
        public static string GetDeleted()              => Url($"{Base}/deleted");
        public static string CountDeleted()            => Url($"{Base}/deleted/count");
        public static string Restore(int id)           => Url($"{Base}/{id}/restore");
        public static string ForceDelete(int id)       => Url($"{Base}/{id}/force");
    }

    public static class Permiso
    {
        private const string Base = "/sga/permiso";
        public static string GetAll()                  => Url(Base);
        public static string Count()                   => Url($"{Base}/count");
        public static string GetById(int id)           => Url($"{Base}/{id}");
        public static string Create()                  => Url(Base);
        public static string Update(int id)            => Url($"{Base}/{id}");
        public static string Delete(int id)            => Url($"{Base}/{id}");
        public static string GetAllIncludingDeleted()  => Url($"{Base}/all-including-deleted");
        public static string GetDeleted()              => Url($"{Base}/deleted");
        public static string CountDeleted()            => Url($"{Base}/deleted/count");
        public static string Restore(int id)           => Url($"{Base}/{id}/restore");
        public static string ForceDelete(int id)       => Url($"{Base}/{id}/force");
    }

    public static class RolTripulacion
    {
        private const string Base = "/sga/rol-tripulacion";
        public static string GetAll()                  => Url(Base);
        public static string Count()                   => Url($"{Base}/count");
        public static string GetById(int id)           => Url($"{Base}/{id}");
        public static string Create()                  => Url(Base);
        public static string Update(int id)            => Url($"{Base}/{id}");
        public static string Delete(int id)            => Url($"{Base}/{id}");
        public static string GetAllIncludingDeleted()  => Url($"{Base}/all-including-deleted");
        public static string GetDeleted()              => Url($"{Base}/deleted");
        public static string CountDeleted()            => Url($"{Base}/deleted/count");
        public static string Restore(int id)           => Url($"{Base}/{id}/restore");
        public static string ForceDelete(int id)       => Url($"{Base}/{id}/force");
    }

    public static class TipoOperacionPista
    {
        private const string Base = "/sga/tipo-operacion-pista";
        public static string GetAll()                  => Url(Base);
        public static string Count()                   => Url($"{Base}/count");
        public static string GetById(int id)           => Url($"{Base}/{id}");
        public static string Create()                  => Url(Base);
        public static string Update(int id)            => Url($"{Base}/{id}");
        public static string Delete(int id)            => Url($"{Base}/{id}");
        public static string GetAllIncludingDeleted()  => Url($"{Base}/all-including-deleted");
        public static string GetDeleted()              => Url($"{Base}/deleted");
        public static string CountDeleted()            => Url($"{Base}/deleted/count");
        public static string Restore(int id)           => Url($"{Base}/{id}/restore");
        public static string ForceDelete(int id)       => Url($"{Base}/{id}/force");
    }

    // ─────────────────────────────────────────────
    // Entidades Principales
    // ─────────────────────────────────────────────
    public static class Aeropuerto
    {
        private const string Base = "/sga/aeropuerto";
        public static string GetAll()                  => Url(Base);
        public static string Count()                   => Url($"{Base}/count");
        public static string GetById(int id)           => Url($"{Base}/{id}");
        public static string Create()                  => Url(Base);
        public static string Update(int id)            => Url($"{Base}/{id}");
        public static string Delete(int id)            => Url($"{Base}/{id}");
        public static string GetAllIncludingDeleted()  => Url($"{Base}/all-including-deleted");
        public static string GetDeleted()              => Url($"{Base}/deleted");
        public static string CountDeleted()            => Url($"{Base}/deleted/count");
        public static string Restore(int id)           => Url($"{Base}/{id}/restore");
        public static string ForceDelete(int id)       => Url($"{Base}/{id}/force");
    }

    public static class Aerolinea
    {
        private const string Base = "/sga/aerolinea";
        public static string GetAll()                  => Url(Base);
        public static string Count()                   => Url($"{Base}/count");
        public static string GetById(int id)           => Url($"{Base}/{id}");
        public static string Create()                  => Url(Base);
        public static string Update(int id)            => Url($"{Base}/{id}");
        public static string Delete(int id)            => Url($"{Base}/{id}");
        public static string GetAllIncludingDeleted()  => Url($"{Base}/all-including-deleted");
        public static string GetDeleted()              => Url($"{Base}/deleted");
        public static string CountDeleted()            => Url($"{Base}/deleted/count");
        public static string Restore(int id)           => Url($"{Base}/{id}/restore");
        public static string ForceDelete(int id)       => Url($"{Base}/{id}/force");
    }

    public static class ModeloAvion
    {
        private const string Base = "/sga/modelo-avion";
        public static string GetAll()                  => Url(Base);
        public static string Count()                   => Url($"{Base}/count");
        public static string GetById(int id)           => Url($"{Base}/{id}");
        public static string Create()                  => Url(Base);
        public static string Update(int id)            => Url($"{Base}/{id}");
        public static string Delete(int id)            => Url($"{Base}/{id}");
        public static string GetAllIncludingDeleted()  => Url($"{Base}/all-including-deleted");
        public static string GetDeleted()              => Url($"{Base}/deleted");
        public static string CountDeleted()            => Url($"{Base}/deleted/count");
        public static string Restore(int id)           => Url($"{Base}/{id}/restore");
        public static string ForceDelete(int id)       => Url($"{Base}/{id}/force");
    }

    public static class Avion
    {
        private const string Base = "/sga/avion";
        public static string GetAll()                  => Url(Base);
        public static string Count()                   => Url($"{Base}/count");
        public static string GetById(int id)           => Url($"{Base}/{id}");
        public static string Create()                  => Url(Base);
        public static string Update(int id)            => Url($"{Base}/{id}");
        public static string Delete(int id)            => Url($"{Base}/{id}");
        public static string GetAllIncludingDeleted()  => Url($"{Base}/all-including-deleted");
        public static string GetDeleted()              => Url($"{Base}/deleted");
        public static string CountDeleted()            => Url($"{Base}/deleted/count");
        public static string Restore(int id)           => Url($"{Base}/{id}/restore");
        public static string ForceDelete(int id)       => Url($"{Base}/{id}/force");
    }

    public static class ProgramaVuelo
    {
        private const string Base = "/sga/programa-vuelo";
        public static string GetAll()                  => Url(Base);
        public static string Count()                   => Url($"{Base}/count");
        public static string GetById(int id)           => Url($"{Base}/{id}");
        public static string Create()                  => Url(Base);
        public static string Update(int id)            => Url($"{Base}/{id}");
        public static string Delete(int id)            => Url($"{Base}/{id}");
        public static string GetAllIncludingDeleted()  => Url($"{Base}/all-including-deleted");
        public static string GetDeleted()              => Url($"{Base}/deleted");
        public static string CountDeleted()            => Url($"{Base}/deleted/count");
        public static string Restore(int id)           => Url($"{Base}/{id}/restore");
        public static string ForceDelete(int id)       => Url($"{Base}/{id}/force");
    }

    public static class DiaProgramaVuelo
    {
        private const string Base = "/sga/dia-programa-vuelo";
        public static string GetAll()                  => Url(Base);
        public static string Count()                   => Url($"{Base}/count");
        public static string GetById(int id)           => Url($"{Base}/{id}");
        public static string Create()                  => Url(Base);
        public static string Update(int id)            => Url($"{Base}/{id}");
        public static string Delete(int id)            => Url($"{Base}/{id}");
        public static string GetAllIncludingDeleted()  => Url($"{Base}/all-including-deleted");
        public static string GetDeleted()              => Url($"{Base}/deleted");
        public static string CountDeleted()            => Url($"{Base}/deleted/count");
        public static string Restore(int id)           => Url($"{Base}/{id}/restore");
        public static string ForceDelete(int id)       => Url($"{Base}/{id}/force");
    }

    public static class Vuelo
    {
        private const string Base = "/sga/vuelo";
        public static string GetAll()                  => Url(Base);
        public static string Count()                   => Url($"{Base}/count");
        public static string GetById(int id)           => Url($"{Base}/{id}");
        public static string Create()                  => Url(Base);
        public static string Update(int id)            => Url($"{Base}/{id}");
        public static string Delete(int id)            => Url($"{Base}/{id}");
        public static string GetAllIncludingDeleted()  => Url($"{Base}/all-including-deleted");
        public static string GetDeleted()              => Url($"{Base}/deleted");
        public static string CountDeleted()            => Url($"{Base}/deleted/count");
        public static string Restore(int id)           => Url($"{Base}/{id}/restore");
        public static string ForceDelete(int id)       => Url($"{Base}/{id}/force");
        // Consultas especializadas
        public static string Details()                 => Url($"{Base}/details");
        public static string GetByFecha(string fecha)  => Url($"{Base}/fecha/{Uri.EscapeDataString(fecha)}");
    }

    public static class EscalaTecnica
    {
        private const string Base = "/sga/escala-tecnica";
        public static string GetAll()                  => Url(Base);
        public static string Count()                   => Url($"{Base}/count");
        public static string GetById(int id)           => Url($"{Base}/{id}");
        public static string Create()                  => Url(Base);
        public static string Update(int id)            => Url($"{Base}/{id}");
        public static string Delete(int id)            => Url($"{Base}/{id}");
        public static string GetAllIncludingDeleted()  => Url($"{Base}/all-including-deleted");
        public static string GetDeleted()              => Url($"{Base}/deleted");
        public static string CountDeleted()            => Url($"{Base}/deleted/count");
        public static string Restore(int id)           => Url($"{Base}/{id}/restore");
        public static string ForceDelete(int id)       => Url($"{Base}/{id}/force");
    }

    public static class Pasajero
    {
        private const string Base = "/sga/pasajero";
        public static string GetAll()                  => Url(Base);
        public static string Count()                   => Url($"{Base}/count");
        public static string GetById(int id)           => Url($"{Base}/{id}");
        public static string Create()                  => Url(Base);
        public static string Update(int id)            => Url($"{Base}/{id}");
        public static string Delete(int id)            => Url($"{Base}/{id}");
        public static string GetAllIncludingDeleted()  => Url($"{Base}/all-including-deleted");
        public static string GetDeleted()              => Url($"{Base}/deleted");
        public static string CountDeleted()            => Url($"{Base}/deleted/count");
        public static string Restore(int id)           => Url($"{Base}/{id}/restore");
        public static string ForceDelete(int id)       => Url($"{Base}/{id}/force");
        // Consultas especializadas
        public static string Details()                             => Url($"{Base}/details");
        public static string GetByPasaporte(string pasaporte)     => Url($"{Base}/pasaporte/{Uri.EscapeDataString(pasaporte)}");
    }

    public static class PuertaEmbarque
    {
        private const string Base = "/sga/puerta-embarque";
        public static string GetAll()                  => Url(Base);
        public static string Count()                   => Url($"{Base}/count");
        public static string GetById(int id)           => Url($"{Base}/{id}");
        public static string Create()                  => Url(Base);
        public static string Update(int id)            => Url($"{Base}/{id}");
        public static string Delete(int id)            => Url($"{Base}/{id}");
        public static string GetAllIncludingDeleted()  => Url($"{Base}/all-including-deleted");
        public static string GetDeleted()              => Url($"{Base}/deleted");
        public static string CountDeleted()            => Url($"{Base}/deleted/count");
        public static string Restore(int id)           => Url($"{Base}/{id}/restore");
        public static string ForceDelete(int id)       => Url($"{Base}/{id}/force");
    }

    public static class Empleado
    {
        private const string Base = "/sga/empleado";
        public static string GetAll()                  => Url(Base);
        public static string Count()                   => Url($"{Base}/count");
        public static string GetById(int id)           => Url($"{Base}/{id}");
        public static string Create()                  => Url(Base);
        public static string Update(int id)            => Url($"{Base}/{id}");
        public static string Delete(int id)            => Url($"{Base}/{id}");
        public static string GetAllIncludingDeleted()  => Url($"{Base}/all-including-deleted");
        public static string GetDeleted()              => Url($"{Base}/deleted");
        public static string CountDeleted()            => Url($"{Base}/deleted/count");
        public static string Restore(int id)           => Url($"{Base}/{id}/restore");
        public static string ForceDelete(int id)       => Url($"{Base}/{id}/force");
    }

    // ─────────────────────────────────────────────
    // Operaciones
    // ─────────────────────────────────────────────
    public static class Reserva
    {
        private const string Base = "/sga/reserva";
        public static string GetAll()                  => Url(Base);
        public static string Count()                   => Url($"{Base}/count");
        public static string GetById(int id)           => Url($"{Base}/{id}");
        public static string Create()                  => Url(Base);
        public static string Update(int id)            => Url($"{Base}/{id}");
        public static string Delete(int id)            => Url($"{Base}/{id}");
        public static string GetAllIncludingDeleted()  => Url($"{Base}/all-including-deleted");
        public static string GetDeleted()              => Url($"{Base}/deleted");
        public static string CountDeleted()            => Url($"{Base}/deleted/count");
        public static string Restore(int id)           => Url($"{Base}/{id}/restore");
        public static string ForceDelete(int id)       => Url($"{Base}/{id}/force");
    }

    public static class Detalle
    {
        private const string Base = "/sga/detalle";
        public static string GetAll()                  => Url(Base);
        public static string Count()                   => Url($"{Base}/count");
        public static string GetById(int id)           => Url($"{Base}/{id}");
        public static string Create()                  => Url(Base);
        public static string Update(int id)            => Url($"{Base}/{id}");
        public static string Delete(int id)            => Url($"{Base}/{id}");
        public static string GetAllIncludingDeleted()  => Url($"{Base}/all-including-deleted");
        public static string GetDeleted()              => Url($"{Base}/deleted");
        public static string CountDeleted()            => Url($"{Base}/deleted/count");
        public static string Restore(int id)           => Url($"{Base}/{id}/restore");
        public static string ForceDelete(int id)       => Url($"{Base}/{id}/force");
    }

    public static class Boleto
    {
        private const string Base = "/sga/boleto";
        public static string GetAll()                  => Url(Base);
        public static string Count()                   => Url($"{Base}/count");
        public static string GetById(int id)           => Url($"{Base}/{id}");
        public static string Create()                  => Url(Base);
        public static string Update(int id)            => Url($"{Base}/{id}");
        public static string Delete(int id)            => Url($"{Base}/{id}");
        public static string GetAllIncludingDeleted()  => Url($"{Base}/all-including-deleted");
        public static string GetDeleted()              => Url($"{Base}/deleted");
        public static string CountDeleted()            => Url($"{Base}/deleted/count");
        public static string Restore(int id)           => Url($"{Base}/{id}/restore");
        public static string ForceDelete(int id)       => Url($"{Base}/{id}/force");
    }

    public static class Equipaje
    {
        private const string Base = "/sga/equipaje";
        public static string GetAll()                  => Url(Base);
        public static string Count()                   => Url($"{Base}/count");
        public static string GetById(int id)           => Url($"{Base}/{id}");
        public static string Create()                  => Url(Base);
        public static string Update(int id)            => Url($"{Base}/{id}");
        public static string Delete(int id)            => Url($"{Base}/{id}");
        public static string GetAllIncludingDeleted()  => Url($"{Base}/all-including-deleted");
        public static string GetDeleted()              => Url($"{Base}/deleted");
        public static string CountDeleted()            => Url($"{Base}/deleted/count");
        public static string Restore(int id)           => Url($"{Base}/{id}/restore");
        public static string ForceDelete(int id)       => Url($"{Base}/{id}/force");
    }

    public static class AsignacionPuerta
    {
        private const string Base = "/sga/asignacion-puerta";
        public static string GetAll()                  => Url(Base);
        public static string Count()                   => Url($"{Base}/count");
        public static string GetById(int id)           => Url($"{Base}/{id}");
        public static string Create()                  => Url(Base);
        public static string Update(int id)            => Url($"{Base}/{id}");
        public static string Delete(int id)            => Url($"{Base}/{id}");
        public static string GetAllIncludingDeleted()  => Url($"{Base}/all-including-deleted");
        public static string GetDeleted()              => Url($"{Base}/deleted");
        public static string CountDeleted()            => Url($"{Base}/deleted/count");
        public static string Restore(int id)           => Url($"{Base}/{id}/restore");
        public static string ForceDelete(int id)       => Url($"{Base}/{id}/force");
    }

    public static class HistorialVuelo
    {
        private const string Base = "/sga/historial-vuelo";
        public static string GetAll()                  => Url(Base);
        public static string Count()                   => Url($"{Base}/count");
        public static string GetById(int id)           => Url($"{Base}/{id}");
        public static string Create()                  => Url(Base);
        public static string Update(int id)            => Url($"{Base}/{id}");
        public static string Delete(int id)            => Url($"{Base}/{id}");
        public static string GetAllIncludingDeleted()  => Url($"{Base}/all-including-deleted");
        public static string GetDeleted()              => Url($"{Base}/deleted");
        public static string CountDeleted()            => Url($"{Base}/deleted/count");
        public static string Restore(int id)           => Url($"{Base}/{id}/restore");
        public static string ForceDelete(int id)       => Url($"{Base}/{id}/force");
        // Consulta especializada
        public static string GetByVuelo(int vueloId)   => Url($"{Base}/vuelo/{vueloId}");
    }

    public static class ObjetoPerdido
    {
        private const string Base = "/sga/objeto-perdido";
        public static string GetAll()                  => Url(Base);
        public static string Count()                   => Url($"{Base}/count");
        public static string GetById(int id)           => Url($"{Base}/{id}");
        public static string Create()                  => Url(Base);
        public static string Update(int id)            => Url($"{Base}/{id}");
        public static string Delete(int id)            => Url($"{Base}/{id}");
        public static string GetAllIncludingDeleted()  => Url($"{Base}/all-including-deleted");
        public static string GetDeleted()              => Url($"{Base}/deleted");
        public static string CountDeleted()            => Url($"{Base}/deleted/count");
        public static string Restore(int id)           => Url($"{Base}/{id}/restore");
        public static string ForceDelete(int id)       => Url($"{Base}/{id}/force");
    }

    public static class Arresto
    {
        private const string Base = "/sga/arresto";
        public static string GetAll()                  => Url(Base);
        public static string Count()                   => Url($"{Base}/count");
        public static string GetById(int id)           => Url($"{Base}/{id}");
        public static string Create()                  => Url(Base);
        public static string Update(int id)            => Url($"{Base}/{id}");
        public static string Delete(int id)            => Url($"{Base}/{id}");
        public static string GetAllIncludingDeleted()  => Url($"{Base}/all-including-deleted");
        public static string GetDeleted()              => Url($"{Base}/deleted");
        public static string CountDeleted()            => Url($"{Base}/deleted/count");
        public static string Restore(int id)           => Url($"{Base}/{id}/restore");
        public static string ForceDelete(int id)       => Url($"{Base}/{id}/force");
    }

    // ─────────────────────────────────────────────
    // Entidades Extendidas
    // ─────────────────────────────────────────────
    public static class AsignacionEmpleado
    {
        private const string Base = "/sga/asignacion-empleado";
        public static string GetAll()                  => Url(Base);
        public static string Count()                   => Url($"{Base}/count");
        public static string GetById(int id)           => Url($"{Base}/{id}");
        public static string Create()                  => Url(Base);
        public static string Update(int id)            => Url($"{Base}/{id}");
        public static string Delete(int id)            => Url($"{Base}/{id}");
        public static string GetAllIncludingDeleted()  => Url($"{Base}/all-including-deleted");
        public static string GetDeleted()              => Url($"{Base}/deleted");
        public static string CountDeleted()            => Url($"{Base}/deleted/count");
        public static string Restore(int id)           => Url($"{Base}/{id}/restore");
        public static string ForceDelete(int id)       => Url($"{Base}/{id}/force");
    }

    public static class Pago
    {
        private const string Base = "/sga/pago";
        public static string GetAll()                  => Url(Base);
        public static string Count()                   => Url($"{Base}/count");
        public static string GetById(int id)           => Url($"{Base}/{id}");
        public static string Create()                  => Url(Base);
        public static string Update(int id)            => Url($"{Base}/{id}");
        public static string Delete(int id)            => Url($"{Base}/{id}");
        public static string GetAllIncludingDeleted()  => Url($"{Base}/all-including-deleted");
        public static string GetDeleted()              => Url($"{Base}/deleted");
        public static string CountDeleted()            => Url($"{Base}/deleted/count");
        public static string Restore(int id)           => Url($"{Base}/{id}/restore");
        public static string ForceDelete(int id)       => Url($"{Base}/{id}/force");
    }

    public static class Reembolso
    {
        private const string Base = "/sga/reembolso";
        public static string GetAll()                  => Url(Base);
        public static string Count()                   => Url($"{Base}/count");
        public static string GetById(int id)           => Url($"{Base}/{id}");
        public static string Create()                  => Url(Base);
        public static string Update(int id)            => Url($"{Base}/{id}");
        public static string Delete(int id)            => Url($"{Base}/{id}");
        public static string GetAllIncludingDeleted()  => Url($"{Base}/all-including-deleted");
        public static string GetDeleted()              => Url($"{Base}/deleted");
        public static string CountDeleted()            => Url($"{Base}/deleted/count");
        public static string Restore(int id)           => Url($"{Base}/{id}/restore");
        public static string ForceDelete(int id)       => Url($"{Base}/{id}/force");
    }

    public static class PasajeroVuelo
    {
        private const string Base = "/sga/pasajero-vuelo";
        public static string GetAll()                  => Url(Base);
        public static string Count()                   => Url($"{Base}/count");
        public static string GetById(int id)           => Url($"{Base}/{id}");
        public static string Create()                  => Url(Base);
        public static string Update(int id)            => Url($"{Base}/{id}");
        public static string Delete(int id)            => Url($"{Base}/{id}");
        public static string GetAllIncludingDeleted()  => Url($"{Base}/all-including-deleted");
        public static string GetDeleted()              => Url($"{Base}/deleted");
        public static string CountDeleted()            => Url($"{Base}/deleted/count");
        public static string Restore(int id)           => Url($"{Base}/{id}/restore");
        public static string ForceDelete(int id)       => Url($"{Base}/{id}/force");
        // Consulta especializada
        public static string GetByVuelo(int vueloId)   => Url($"{Base}/vuelo/{vueloId}");
    }

    public static class Checkin
    {
        private const string Base = "/sga/checkin";
        public static string GetAll()                  => Url(Base);
        public static string Count()                   => Url($"{Base}/count");
        public static string GetById(int id)           => Url($"{Base}/{id}");
        public static string Create()                  => Url(Base);
        public static string Update(int id)            => Url($"{Base}/{id}");
        public static string Delete(int id)            => Url($"{Base}/{id}");
        public static string GetAllIncludingDeleted()  => Url($"{Base}/all-including-deleted");
        public static string GetDeleted()              => Url($"{Base}/deleted");
        public static string CountDeleted()            => Url($"{Base}/deleted/count");
        public static string Restore(int id)           => Url($"{Base}/{id}/restore");
        public static string ForceDelete(int id)       => Url($"{Base}/{id}/force");
    }

    public static class Asiento
    {
        private const string Base = "/sga/asiento";
        public static string GetAll()                  => Url(Base);
        public static string Count()                   => Url($"{Base}/count");
        public static string GetById(int id)           => Url($"{Base}/{id}");
        public static string Create()                  => Url(Base);
        public static string Update(int id)            => Url($"{Base}/{id}");
        public static string Delete(int id)            => Url($"{Base}/{id}");
        public static string GetAllIncludingDeleted()  => Url($"{Base}/all-including-deleted");
        public static string GetDeleted()              => Url($"{Base}/deleted");
        public static string CountDeleted()            => Url($"{Base}/deleted/count");
        public static string Restore(int id)           => Url($"{Base}/{id}/restore");
        public static string ForceDelete(int id)       => Url($"{Base}/{id}/force");
        // Consulta especializada
        public static string GetByAvion(int avionId)   => Url($"{Base}/avion/{avionId}");
    }

    public static class AsignacionAsiento
    {
        private const string Base = "/sga/asignacion-asiento";
        public static string GetAll()                  => Url(Base);
        public static string Count()                   => Url($"{Base}/count");
        public static string GetById(int id)           => Url($"{Base}/{id}");
        public static string Create()                  => Url(Base);
        public static string Update(int id)            => Url($"{Base}/{id}");
        public static string Delete(int id)            => Url($"{Base}/{id}");
        public static string GetAllIncludingDeleted()  => Url($"{Base}/all-including-deleted");
        public static string GetDeleted()              => Url($"{Base}/deleted");
        public static string CountDeleted()            => Url($"{Base}/deleted/count");
        public static string Restore(int id)           => Url($"{Base}/{id}/restore");
        public static string ForceDelete(int id)       => Url($"{Base}/{id}/force");
    }

    public static class Usuario
    {
        private const string Base = "/sga/usuario";
        public static string GetAll()                        => Url(Base);
        public static string Count()                         => Url($"{Base}/count");
        public static string GetById(int id)                 => Url($"{Base}/{id}");
        public static string Create()                        => Url(Base);
        public static string Update(int id)                  => Url($"{Base}/{id}");
        public static string Delete(int id)                  => Url($"{Base}/{id}");
        public static string GetAllIncludingDeleted()        => Url($"{Base}/all-including-deleted");
        public static string GetDeleted()                    => Url($"{Base}/deleted");
        public static string CountDeleted()                  => Url($"{Base}/deleted/count");
        public static string Restore(int id)                 => Url($"{Base}/{id}/restore");
        public static string ForceDelete(int id)             => Url($"{Base}/{id}/force");
        // Consulta especializada
        public static string GetByUsername(string username)  => Url($"{Base}/username/{Uri.EscapeDataString(username)}");
    }

    public static class RolPermiso
    {
        private const string Base = "/sga/rol-permiso";
        public static string GetAll()                  => Url(Base);
        public static string Count()                   => Url($"{Base}/count");
        public static string GetById(int id)           => Url($"{Base}/{id}");
        public static string Create()                  => Url(Base);
        public static string Update(int id)            => Url($"{Base}/{id}");
        public static string Delete(int id)            => Url($"{Base}/{id}");
        public static string GetAllIncludingDeleted()  => Url($"{Base}/all-including-deleted");
        public static string GetDeleted()              => Url($"{Base}/deleted");
        public static string CountDeleted()            => Url($"{Base}/deleted/count");
        public static string Restore(int id)           => Url($"{Base}/{id}/restore");
        public static string ForceDelete(int id)       => Url($"{Base}/{id}/force");
        // Consulta especializada
        public static string GetByRol(int rolId)       => Url($"{Base}/rol/{rolId}");
    }

    public static class MantenimientoAvion
    {
        private const string Base = "/sga/mantenimiento-avion";
        public static string GetAll()                  => Url(Base);
        public static string Count()                   => Url($"{Base}/count");
        public static string GetById(int id)           => Url($"{Base}/{id}");
        public static string Create()                  => Url(Base);
        public static string Update(int id)            => Url($"{Base}/{id}");
        public static string Delete(int id)            => Url($"{Base}/{id}");
        public static string GetAllIncludingDeleted()  => Url($"{Base}/all-including-deleted");
        public static string GetDeleted()              => Url($"{Base}/deleted");
        public static string CountDeleted()            => Url($"{Base}/deleted/count");
        public static string Restore(int id)           => Url($"{Base}/{id}/restore");
        public static string ForceDelete(int id)       => Url($"{Base}/{id}/force");
    }

    public static class TripulacionVuelo
    {
        private const string Base = "/sga/tripulacion-vuelo";
        public static string GetAll()                  => Url(Base);
        public static string Count()                   => Url($"{Base}/count");
        public static string GetById(int id)           => Url($"{Base}/{id}");
        public static string Create()                  => Url(Base);
        public static string Update(int id)            => Url($"{Base}/{id}");
        public static string Delete(int id)            => Url($"{Base}/{id}");
        public static string GetAllIncludingDeleted()  => Url($"{Base}/all-including-deleted");
        public static string GetDeleted()              => Url($"{Base}/deleted");
        public static string CountDeleted()            => Url($"{Base}/deleted/count");
        public static string Restore(int id)           => Url($"{Base}/{id}/restore");
        public static string ForceDelete(int id)       => Url($"{Base}/{id}/force");
        // Consulta especializada
        public static string GetByVuelo(int vueloId)   => Url($"{Base}/vuelo/{vueloId}");
    }

    public static class Pista
    {
        private const string Base = "/sga/pista";
        public static string GetAll()                  => Url(Base);
        public static string Count()                   => Url($"{Base}/count");
        public static string GetById(int id)           => Url($"{Base}/{id}");
        public static string Create()                  => Url(Base);
        public static string Update(int id)            => Url($"{Base}/{id}");
        public static string Delete(int id)            => Url($"{Base}/{id}");
        public static string GetAllIncludingDeleted()  => Url($"{Base}/all-including-deleted");
        public static string GetDeleted()              => Url($"{Base}/deleted");
        public static string CountDeleted()            => Url($"{Base}/deleted/count");
        public static string Restore(int id)           => Url($"{Base}/{id}/restore");
        public static string ForceDelete(int id)       => Url($"{Base}/{id}/force");
    }

    public static class AsignacionPista
    {
        private const string Base = "/sga/asignacion-pista";
        public static string GetAll()                  => Url(Base);
        public static string Count()                   => Url($"{Base}/count");
        public static string GetById(int id)           => Url($"{Base}/{id}");
        public static string Create()                  => Url(Base);
        public static string Update(int id)            => Url($"{Base}/{id}");
        public static string Delete(int id)            => Url($"{Base}/{id}");
        public static string GetAllIncludingDeleted()  => Url($"{Base}/all-including-deleted");
        public static string GetDeleted()              => Url($"{Base}/deleted");
        public static string CountDeleted()            => Url($"{Base}/deleted/count");
        public static string Restore(int id)           => Url($"{Base}/{id}/restore");
        public static string ForceDelete(int id)       => Url($"{Base}/{id}/force");
    }
}
